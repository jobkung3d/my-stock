const express = require('express')
const app = express()
const books = require('./db')
const cors = require('cors')
const mysql = require('mysql')
//const bodyParser = require('body-parser')
//ใช้ในการเขียน File
const formidable = require('formidable')
const fs = require('fs')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project_stock'
})

// ใช้ cors เพื่อ allow-origin ว่าอนุญาติให้เว็บไหนใช้ได้บ้าง
app.use(cors())


/*app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));*/

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/products', (req,res)=>{
    res.json(books) 
})

app.get('/api/users', (req,res)=>{
    connection.connect()
    connection.query('SELECT * FROM user WHERE 1', function (err, rows, fields) {
        if (err) throw err
        res.json(rows)   
    })
    connection.end()
}) 

app.get('/stocks', (req,res)=>{
    res.send('stock')
})

app.post('/api/product', (req,res)=>{
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        res.json(fields.image_path);
        /*let oldpath = files.filetoupload.path;//ตำแหน่งที่เราเลือกต้นทาง
        let newpath = 'uploads/' + files.filetoupload.name;//ตำแหน่งปลายทาง*/
    });
   
    /*form.parse(req, function (err, fields, files) {
        let oldpath = files.filetoupload.path;//ตำแหน่งที่เราเลือกต้นทาง
        let newpath = 'uploads/' + files.filetoupload.name;//ตำแหน่งปลายทาง*/
        /*fs.rename(oldpath,newpath, function (err) {
            if (err) throw err;
            res.write('Upload Complete!');
            res.end();
        });*/
    //});

    /*connection.connect()
    let sql = "INSERT INTO products "
        sql += "(id, user_id, product_name, image_path, original_price, sell_price, barcode, date_add) VALUES "
        sql += "(NULL, '"+req.body.user_id+"', '"+req.body.product_name+"', '"+req.body.image_path+"', '"+req.body.original_price+"', '"+req.body.sell_price+"', '"+req.body.barcode+"', '"+req.body.date_add+"') "

    connection.query(sql, function (err, rows, fields) {
        if (err) throw err
        res.json(rows)
    })
    connection.end()*/
    
})

app.post('/api/upload', (req,res)=>{
    res.json('uploaded!')
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