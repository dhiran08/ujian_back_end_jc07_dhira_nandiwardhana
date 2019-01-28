const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.PORT || 1997;

const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'saitama',
    password: 'abc123',
    database: 'moviebertasbih',
    port: 3306
});

module.exports = conn;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));


//Bagian Home-page
app.get('/', (req, res) => {
    res.send('<center><h1> ini Home Page </h1></center>');
})

//Bagian Manage Movies
app.get('/managemovie', (req, res) => {
    var sql = `select * from movies`;
    conn.query(sql, (err, result) => {
        if (err) throw err;

        res.send(result);
    })
})

//Bagian Manage Catagories
app.get('/managecategory', (req, res) => {
    var sql = `select * from categories`;
    conn.query(sql, (err, result1) => {
        if (err) throw err;

        res.send(result1);
    })
})

//Bagian Connect Movies & Categories
app.get('/movcat', (req, res) => {
    var sql = `select * from movcat`;
    conn.query(sql, (err, result2) => {
        if (err) throw err;

        res.send(result2);
    })
})

//Bagian Delete Movies
app.delete('/deletemovies/:nama', (req, res) => {
    var moviesId = req.params.nama;
    var sql = `select * from movies where nama = '${moviesId}'`;

    conn.query(sql, (err, result3) => {
        if (err) throw err;

        if (result3.length > 0) {
            sql = `delete from movies, movcat where nama, namamovies = '${moviesId}'`;
        }

        res.send(result3);
    })
})

app.listen(port, () => console.log(`Selamat, API aktif di port '${port}`));