
const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function () {
    const odberatelInput = document.querySelector('#odberatel-input');
    const odberatel = odberatelInput.value;
    odberatelInput.value = "";

    const cenaInput = document.querySelector('#cena-input');
    const cena = cenaInput.value;
    cenaInput.value = "";

    const datumInput = document.querySelector('#datum-input');
    const datum = datumInput.value;
    datumInput.value = "";

    const spzInput = document.querySelector('#spz-input');
    const spz = spzInput.value;
    spzInput.value = "";

    const firma_naklInput = document.querySelector('#firmanakl-input');
    const firma_nakl = firma_naklInput.value;
    firma_naklInput.value = "";

    const adresa_naklInput = document.querySelector('#adresanakl-input');
    const adresa_nakl = adresa_naklInput.value;
    adresa_naklInput.value = "";

    const firma_vyklInput = document.querySelector('#firmavykl-input');
    const firma_vykl = firma_vyklInput.value;
    firma_vyklInput.value = "";

    const adresa_vyklInput = document.querySelector('#adresavykl-input');
    const adresa_vykl = adresa_vyklInput.value;
    adresa_vyklInput.value = "";

    const emailInput = document.querySelector('#email-input');
    const email = emailInput.value;
    emailInput.value = "";

    const telInput = document.querySelector('#tel-input');
    const tel = telInput.value;
    telInput.value = "";


    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            odberatel : odberatel,
            cena : cena,
            datum : datum, 
            spz : spz, 
            firma_nakl : firma_nakl, 
            adresa_nakl : adresa_nakl, 
            firma_vykl : firma_vykl, 
            adresa_vykl : adresa_vykl, 
            email : email, 
            tel : tel
        })
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id} data-odberatel=${data.odberatel}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

$(function() {
    $('#datepicker').datepicker({
        format: 'yyyy-mm-dd',
    });
});  