const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes')
require('dotenv').config()

const app = express()

app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bh59q.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Error de conexión: '))
db.once('open', function () {
  console.log('Conexión exitosa')
})

app.use(Router)

app.listen(8080, () => {
  console.log('El servidor esta en el puerto 8080')
})