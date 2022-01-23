const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// create
app.post('/insert', (request, response) => {
    const { odberatel, cena, datum, spz, firma_nakl, adresa_nakl, firma_vykl, adresa_vykl, email, tel } = request.body;    
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(odberatel, cena, datum, spz, firma_nakl, adresa_nakl, firma_vykl, adresa_vykl, email, tel);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const { id, odberatel, cena, datum, spz, firmanakl, adresanakl, firmavykl, adresavykl, email, tel } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, odberatel, cena, datum, spz, firmanakl, adresanakl, firmavykl, adresavykl, email, tel);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});



app.listen(process.env.PORT, () => console.log('app is running'));