require("dotenv").config();
const express = require('express');
const massive = require('massive');
const productController = require('./productController')

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set("db", dbInstance);
    console.log('Database Connected')
})
.catch(err => console.log(err));

app.use(express.json());

app.post('/api/products', productController.create);
app.get('/api/products/:id', productController.getOne);
app.get('/api/products', productController.getAll);
app.put('/api/products/:id', productController.update);
app.delete('/api/products/:id', productController.delete);

app.listen(SERVER_PORT, () => console.log(`Running on Port: ${SERVER_PORT}`));