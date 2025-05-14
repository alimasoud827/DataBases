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
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

function loadHTMLTable(data){
    const table = document.querySelector("table tbody");
    let tableHTML = "";
    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No data available</td></tr>";
        return;
    }

    data.forEach(user => {
        tableHTML += `
            <tr>
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
}

function addTableRow(user) {
    const table = document.querySelector("table tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
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
