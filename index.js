const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');


app.use(bodyparser.json());


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'NODEDB'
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('DB Connection Success!');
    }else{
        console.log('DB Connection Falied! \n Error :' + JSON.stringify(err, undefined, 2));
    }
});



app.listen(3000, ()=>console.log('Server Running'));


//Get All data
app.get('/Users', (req,res)=>{
    mysqlConnection.query('SELECT * FROM test', (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});


//Get 1 data
app.get('/Users/:id', (req,res)=>{
    mysqlConnection.query('SELECT * FROM test WHERE id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err){
         res.send(rows);
        }else{
            console.log(err);
        }
    });
});


//Delete 1 data
app.delete('/Users/:id', (req,res)=>{
    mysqlConnection.query('DELETE FROM test WHERE id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err){
            res.send('Deleted Success');
        }else{
            console.log(err);
        }
    });
});


//Insert 1 data
app.post('/Users', (req,res)=>{
    const UserName = req.body.UserName;
    const EmailAdd = req.body.EmailAdd;
    
    mysqlConnection.query('INSERT INTO test (UserName, EmailAdd) VALUES (?,?)', [UserName, EmailAdd], (err, rows, fields)=>{
        if(!err){
            res.send('Insert Success');
        }else{
            console.log(err);
        }
    });
});


//update 1 data
app.put('/Users', (req,res)=>{
    const UserName = req.body.UserName;
    const EmailAdd = req.body.EmailAdd;
    
    mysqlConnection.query('UPDATE test SET EmailAdd = ? WHERE UserName = ?', [EmailAdd, UserName], (err, rows, fields)=>{
        if(!err){
            res.send('updated Success');
        }else{
            console.log(err);
        }
    });
});