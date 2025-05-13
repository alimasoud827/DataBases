document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/getAll")
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        loadHTMLTable(data.users)}
    )
    .catch(error => {
        console.error("Error fetching data:", error);
    });
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