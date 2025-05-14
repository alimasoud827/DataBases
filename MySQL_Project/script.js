document.addEventListener("DOMContentLoaded", () => fetchAndLoadTable());

function fetchAndLoadTable() {
    fetch("http://localhost:5000/getAll")
    .then(response => response.json())
    .then(data => {
        loadHTMLTable(data.users);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}

const submitBtn = document.getElementById("submit");
const nameInput = document.getElementById("name");

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) {
        alert("Please enter a name");
        return;
    }
    try {
        const response = await fetch("http://localhost:5000/insert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        const data = await response.json();
        if (data.success) {
            alert(data.message);
            nameInput.value = "";
            addTableRow(data.user);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

let count = 0; 
function loadHTMLTable(data){
    const table = document.querySelector("table tbody");
    let tableHTML = "";
    if(!data || data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No users available</td></tr>";
        return;
    }

    data.forEach(user => {
        count++;
        console.log(count);
        tableHTML += `
            <tr>
                <td class="count">${count}</td>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${new Date(user.date_added).toLocaleString()}</td>
                <td class="delete-row-btn" data-id=${user.id}>
                    <button class="delete-btn">Delete</button>
                </td>
                <td class="edit-row-btn" data-id=${user.id}>
                    <button class="edit-btn">Edit</button>
                </td>
            </tr>
        `;
    });

    table.innerHTML = tableHTML;
    return count;
}

function addTableRow(user) {
    const table = document.querySelector("table tbody");
    const row = document.createElement("tr");
    count++;
    row.innerHTML = `
        <td class="count">${count}</td>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${new Date(user.date_added).toLocaleString()}</td>
        <td class="delete-row-btn" data-id=${user.id}>
            <button class="delete-btn">Delete</button>
        </td>
        <td class="edit-row-btn" data-id=${user.id}>
            <button class="edit-btn">Edit</button>
        </td>
    `;
    table.appendChild(row);
}
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    searchTable();
});

function searchTable() {
    const searchQuery = searchInput.value.trim().toLowerCase();
    const tableRows = document.querySelectorAll("table tbody tr");
    const tableBody = document.querySelector("table tbody");
    console.log("searchQuery", searchQuery);

    let matchFound = false;

    const existingNoDataRow = tableBody.querySelector(".no-data");
    if (existingNoDataRow) {
        existingNoDataRow.remove();
    }

    tableRows.forEach(row => {
        const nameCell = row.querySelector("td:nth-child(3)");
        if (!nameCell) return;
        const name = nameCell.textContent.toLowerCase();
        
        const isMatch = name.includes(searchQuery) || fizzyMatch(searchQuery, name);
        if (isMatch) {
            row.style.display = "";
            matchFound = true;
        } else {
            console.log("not match", name + " " + searchQuery);
            row.style.display = "none";
        }
    });

    if (!matchFound) {
        const noDataRow = document.createElement("tr");
        noDataRow.classList.add("no-data");
        noDataRow.innerHTML = "<td colspan='5'>No matching users found</td>";
        tableBody.appendChild(noDataRow);
    }
};

function fizzyMatch(pattern, text) {
    const patternParts = pattern.split("");
    let textIndex = 0;

    for (let i = 0; i < patternParts.length; i++) {
        const part = patternParts[i];
        textIndex = text.indexOf(part, textIndex);
        if (textIndex === -1) {
            return false;
        }
        textIndex++;
    }
    return true;
}
function deleteRow(userId) {
    const tableRows = document.querySelectorAll("table tbody tr");
    tableRows.forEach(row => {
        const idCell = row.querySelector("td:nth-child(1)");
        if (idCell.textContent == userId) {
            row.remove();
        }
    });
    count = 0;
}

document.querySelector("table tbody").addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("delete-btn")) {
        const confirmed = confirm("Are you sure you want to delete this user?");
        if (confirmed) {
            const userId = e.target.closest("td").dataset.id;
            
            try {
                fetch(`http://localhost:5000/delete/${userId}`, {
                    method: "DELETE",
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(data.message);
                        fetchAndLoadTable();
                    } else {
                        alert(data.message);
                    }
                });
                deleteRow(userId);
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
});
