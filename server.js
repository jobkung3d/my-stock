const express = require('express')
const app = express()
const books = require('./db')

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/books', (req,res)=>{
    res.json(books) 
})

app.listen(3000, ()=>{
    console.log('Start server at port 3000')
})