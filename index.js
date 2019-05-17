const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password: 'dr@keov0',
    database: 'CustomerDB',
    multipleStatements: true
});

mysqlConnection.connect((err)=> {
    if (!err)
    console.log('DB connection succeeded');
    else
    console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=> console.log('Express server is running at port no: 3000'));

// getting all customers from the database
app.get('/customers', (req,res)=>{
    mysqlConnection.query('SELECT * FROM Customers', (err, rows, fields)=>{
    if(!err)
    {
        console.log(rows[0].id);
        res.send(rows);
    }
    else
    console.log(err);
    })
});

// getting a customer from the database
app.get('/customers/:id', (req,res)=>{
    mysqlConnection.query('SELECT * FROM Customers WHERE id = ?',[req.params.id], (err, rows, fields)=>{
    if(!err)
    {
        console.log(rows[0].id);
        res.send(rows);
    }
    else
    console.log(err);
    })
});

// delete a customer from the database
app.delete('/customers/:id', (req,res)=>{
    mysqlConnection.query('DELETE FROM Customers WHERE id = ?',[req.params.id], (err, rows, fields)=>{
    if(!err)
    {
        console.log(rows[0].id);
        res.send('Deleted successfully');
    }
    else
    console.log(err);
    })
});

// insert a customer to the database
app.post('/customers', (req,res)=>{
    let cust = req.body;
    var sql = "SET @id = ?; SET @email = ?; SET @first_name = ?; SET @last_name = ?; SET @ip = ?; SET @latitude = ?; SET @longitude = ?; SET @created_at = ?; SET @updated_at = ?; \
    CALL add_editCustomer(@id, @email, @first_name, @last_name, @ip, @latitude, @longitude, @created_at, @updated_at);";
    mysqlConnection.query(sql, [cust.id, cust.email, cust.first_name, cust.last_name, cust.ip, cust.latitude, cust.longitude, cust.created_at, cust.updated_at], (err, rows, fields) => {
    if(!err)
    {
        rows.forEach(element =>{
            if(element.constructor == Array)
            res.send('Inserted customer id: ' + element[0].id);
        });
    }
    else
    console.log(err);
    })
});

//update cusotmer
app.put('/customers', (req,res)=>{
    let cust = req.body;
    var sql = "SET @id = ?; SET @email = ?; SET @first_name = ?; SET @last_name = ?; SET @ip = ?; SET @latitude = ?; SET @longitude = ?; SET @created_at = ?; SET @updated_at = ?; \
    CALL add_editCustomer(@id, @email, @first_name, @last_name, @ip, @latitude, @longitude, @created_at, @updated_at);";
    mysqlConnection.query(sql, [cust.id, cust.email, cust.first_name, cust.last_name, cust.ip, cust.latitude, cust.longitude, cust.created_at, cust.updated_at], (err, rows, fields) => {
    if(!err)
    {
            res.send('updated successfully');
    }
    else
    console.log(err);
    })
});
