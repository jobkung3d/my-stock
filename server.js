const express = require('express')
const app = express()
const books = require('./db')
const cors = require('cors')
const mysql = require('mysql')
const path = require('path')
const bodyParser = require('body-parser')
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

if(connection==null){connection.connect()}

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/products', (req,res)=>{
    res.json(books) 
})

app.get('/api/users', (req,res)=>{
    connection.query('SELECT * FROM user WHERE 1', function (err, rows, fields) {
        if (err) throw err
        res.json(rows)   
    })
}) 
app.get('/api/products', (req,res)=>{
    let sql = "SELECT * FROM products WHERE 1=1"
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err
        res.json(rows)
    })
})

app.get('/api/product/:productId', (req,res)=>{
    let sql = "SELECT * FROM products WHERE id="+ req.params.productId
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err
        res.json(rows)
    })
})

app.put('/api/product/:productId', async (req,res)=>{
    let sql = "UPDATE products SET "
    sql += "product_name = '"+ req.body.product_name +"', "
    sql += "image_path = '"+ req.body.image_path +"', "
    sql += "original_price = '"+ req.body.original_price +"', "
    sql += "sell_price = '"+ req.body.sell_price +"', "
    sql += "barcode = '"+ req.body.barcode +"', "
    sql += "date_add = '"+ req.body.date_add +"' "
    sql += "WHERE products.id = "+ req.params.productId
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err
        res.json(rows)
    })
   // connection.end()
})

app.post('/api/product', (req,res)=>{
    let sql = "INSERT INTO products "
        sql += "(id, user_id, product_name, image_path, original_price, sell_price, barcode, date_add) VALUES "
        sql += "(NULL, '"+req.body.user_id+"', '"+req.body.product_name+"', '"+req.body.image_path+"', '"+req.body.original_price+"', '"+req.body.sell_price+"', '"+req.body.barcode+"', '"+req.body.date_add+"') "
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err
        res.json(rows)
    })
})

app.get("/image/:name", (req, res) => {
    res.sendFile(path.join(__dirname, "./uploads/"+req.params.name));
});

app.post('/api/upload', (req,res)=>{
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        
        let oldpath = files.avatar.path;//ตำแหน่งที่เราเลือกต้นทาง
        let newpath = 'uploads/' + files.avatar.name;//ตำแหน่งปลายทาง
         fs.readFile(oldpath, function (err, data) {
            if (err) throw err;

            // Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;
            });

            // Delete the file
           fs.unlink(oldpath, function (err) {
                if (err) throw err;
            });
        });
        
        res.json({
            url : newpath
        });
    });
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