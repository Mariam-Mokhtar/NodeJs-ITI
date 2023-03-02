
var show_all = document.getElementById("show_all");
var sections = document.getElementsByTagName("section");
var table = document.getElementById("all-users");

show_all.addEventListener('click', () => {
    for (let sec of sections) {
        sec.classList.toggle("d-none")
    }
    var table_body = document.createElement("tbody");
    getData().then(data => {
        console.log(data)
        for (var item of data) {
            var record = document.createElement("tr");
            for (let key in item) {
                var field = document.createElement("td");
                field.textContent = item[key];
                record.appendChild(field);
            }
            table_body.appendChild(record);
        }
    })
    table.appendChild(table_body)
})
async function getData() {
    var response = await fetch("../Files/users.json")
    var fetechedData = await response.json();
    console.log(fetechedData)
    console.log("fetechedData")
    return fetechedData;
}