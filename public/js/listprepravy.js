const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
const dbService = require('./dbService');
const res = require('express/lib/response');
const port = process.env.PORT || 5000;
app.use(favicon(__dirname + '/favicon.png'));
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

document.addEventListener('DOMContentLoaded', function () {
    //fetch('http://localhost:'+port+'/getAll')
    //fetch(window.location.hostname+':'+port+'/getAll')
    fetch(window.location.hostname+':'+port+'/listprepravy.html')
    //fetch('/getAll')
    .then(response => response.json())
    //.then(data => loadHTMLTable(data['data']));
    .then(data => console.log(data));
});
/*
document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id, event.target.dataset.odberatel, event.target.dataset.cena, event.target.dataset.datum, event.target.dataset.spz, event.target.dataset.firmanakl, event.target.dataset.adresanakl, event.target.dataset.firmavykl, event.target.dataset.adresavykl, event.target.dataset.email, event.target.dataset.tel);
    }
});



const updateBtn = document.querySelector('#update-row-btn');


/*function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}*/


/*


function handleEditRow(id, odberatel, cena, datum, spz, firmanakl, adresanakl, firmavykl, adresavykl, email, tel) {
    
    document.querySelector('#update-odberatel-input').dataset.id = id;
    document.querySelector('#update-odberatel-input').dataset.odberatel = odberatel;
    document.querySelector('#update-cena-input').dataset.cena = cena;
    document.querySelector('#update-datum-input').dataset.datum = datum;
    document.querySelector('#update-spz-input').dataset.spz = spz;
    document.querySelector('#update-firmanakl-input').dataset.firmanakl = firmanakl;
    document.querySelector('#update-adresanakl-input').dataset.adresanakl = adresanakl;
    document.querySelector('#update-firmavykl-input').dataset.firmavykl = firmavykl;
    document.querySelector('#update-adresavykl-input').dataset.adresavykl = adresavykl;
    document.querySelector('#update-email-input').dataset.email = email;
    document.querySelector('#update-tel-input').dataset.tel = tel;
    
    document.querySelector('#update-odberatel-input').defaultValue = odberatel;
    document.querySelector('#update-cena-input').defaultValue = cena;
    document.querySelector('#update-datum-input').defaultValue = datum;
    document.querySelector('#update-spz-input').defaultValue = spz;
    document.querySelector('#update-firmanakl-input').defaultValue = firmanakl;
    document.querySelector('#update-adresanakl-input').defaultValue = adresanakl;
    document.querySelector('#update-firmavykl-input').defaultValue = firmavykl;
    document.querySelector('#update-adresavykl-input').defaultValue = adresavykl;
    document.querySelector('#update-email-input').defaultValue = email;
    document.querySelector('#update-tel-input').defaultValue = tel;
    
}

updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-odberatel-input');
    const updateCenaInput = document.querySelector('#update-cena-input');
    const updateDatumInput = document.querySelector('#update-datum-input');
    const updateSpzInput = document.querySelector('#update-spz-input');
    const updateFirmanaklInput = document.querySelector('#update-firmanakl-input');
    const updateAdresanaklInput = document.querySelector('#update-adresanakl-input');
    const updateFirmavyklInput = document.querySelector('#update-firmavykl-input');
    const updateAdresavyklInput = document.querySelector('#update-adresavykl-input');
    const updateEmailInput = document.querySelector('#update-email-input');
    const updateTelInput = document.querySelector('#update-tel-input');
    

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            odberatel: updateNameInput.value,
            cena: updateCenaInput.value,
            datum: updateDatumInput.value,
            spz: updateSpzInput.value,
            firmanakl: updateFirmanaklInput.value,
            adresanakl: updateAdresanaklInput.value,
            firmavykl: updateFirmavyklInput.value,
            adresavykl: updateAdresavyklInput.value,
            email: updateEmailInput.value,
            tel: updateTelInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}*/

/*


function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='14'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, odberatel, cena, datum, spz, firma_nakl, adresa_nakl, firma_vykl, adresa_vykl, email, tel, date_added}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${odberatel}</td>`;
        tableHtml += `<td>${cena}</td>`;
        tableHtml += `<td>${datum}</td>`;
        tableHtml += `<td>${spz}</td>`;
        tableHtml += `<td>${firma_nakl}</td>`;
        tableHtml += `<td>${adresa_nakl}</td>`;
        tableHtml += `<td>${firma_vykl}</td>`;
        tableHtml += `<td>${adresa_vykl}</td>`;
        tableHtml += `<td>${email}</td>`;
        tableHtml += `<td>${tel}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Smazat</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id} data-odberatel=${odberatel} data-cena=${cena} data-datum=${datum} data-spz=${spz} data-firmanakl=${firma_nakl} data-adresanakl=${adresa_nakl} data-firmavykl=${firma_vykl} data-adresavykl=${adresa_vykl} data-email=${email} data-tel=${tel} data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Upravit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

$(function() {
    $('#datepicker').datepicker({
        format: 'yyyy-mm-dd',
    });
});  
*/
