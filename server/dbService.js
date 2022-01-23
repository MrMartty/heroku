const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
     console.log('db ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewName(odberatel, cena, datum, spz, firma_nakl, adresa_nakl, firma_vykl, adresa_vykl, email, tel) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (odberatel, cena, datum, spz, firma_nakl, adresa_nakl, firma_vykl, adresa_vykl, email, tel, date_added) VALUES (?,?,?,?,?,?,?,?,?,?,?);";

                connection.query(query, [odberatel, cena, datum, spz, firma_nakl, adresa_nakl, firma_vykl, adresa_vykl, email, tel, dateAdded] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                odberatel : odberatel,
                cena : cena, 
                datum : datum, 
                spz : spz, 
                firma_nakl : firma_nakl, 
                adresa_nakl : adresa_nakl, 
                firma_vykl : firma_vykl, 
                adresa_vykl : adresa_vykl, 
                email : email, 
                tel : tel,
                dateAdded : dateAdded
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, odberatel, cena, datum, spz, firmanakl, adresanakl, firmavykl, adresavykl, email, tel) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET odberatel = ?, cena = ?, datum = ?, spz = ?, firma_nakl = ?, adresa_nakl = ?, firma_vykl = ?, adresa_vykl = ?, email = ?, tel = ? WHERE id = ?";
    
                connection.query(query, [odberatel,cena, datum, spz, firmanakl, adresanakl, firmavykl, adresavykl, email, tel,  id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }    
}

module.exports = DbService;