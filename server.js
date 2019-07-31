const express = require('express')
const app = express()
const books = require('./db')

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project_stock'
})



app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/products', (req,res)=>{
    res.json(books) 
})

app.get('/api/users', (req,res)=>{
    /*connection.connect()
    connection.query('SELECT * FROM user WHERE 1', function (err, rows, fields) {
        if (err) throw err
        res.json(rows)   
    })
    connection.end()*/
    const users = [{"id":1,"first_name":"วรวิทย์","last_name":"ปธานวนิช","email":"worawit@gmail.com","password":"123456"},{"id":2,"first_name":"วรชาติ","last_name":"ปธานวนิช","email":"worachat@gmail.com","password":"Aa123456789"}]
    res.json(users)
}) 

app.get('/stocks', (req,res)=>{
    res.send('stock')
})

app.post('/product/:id', (req,res)=>{
    res.json(books) 
})

app.post('/user/:id', (req,res)=>{
    res.send('user')
})

app.post('/stock/:id', (req,res)=>{
    res.send('stock')
})


app.listen(3000, ()=>{
    console.log('Start server at port 3000')
})