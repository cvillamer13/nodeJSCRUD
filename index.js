const express = require('express');
const mysql = require('mysql');
var app = express();

app.use(express.json());


var mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

mysqlConnection.connect((err) => {
    if(!err) console.log('DB Connection Success!');
    else console.log('DB Connection Falied! \n Error :' + JSON.stringify(err, undefined, 2));
});

app.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM test', (err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});

app.get('/users/:id', (req, res)=>{
    mysqlConnection.query('SELECT * FROM test WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});

app.delete('/users/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM test WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if(!err)
        res.send('Deleted Success');
        else
        console.log(err);
    });
});

app.post('/users', (req, res) => {
    const UserName = req.body.UserName;
    const EmailAdd = req.body.EmailAdd;
    
    mysqlConnection.query('INSERT INTO test (UserName, EmailAdd) VALUES (?,?)', [UserName, EmailAdd], (err, rows, fields) => {
        if(!err)
        res.send('Insert Success');
        else
        console.log(err);
    });
});

app.put('/users', (req, res) => {
    const UserName = req.body.UserName;
    const EmailAdd = req.body.EmailAdd;
    
    mysqlConnection.query('UPDATE test SET EmailAdd = ? WHERE UserName = ?', [EmailAdd, UserName], (err, rows, fields) => {
        if(!err)
        res.send('updated Success');
        else
        console.log(err);
    });
});

app.listen(3000, () => console.log('Server Running'));
