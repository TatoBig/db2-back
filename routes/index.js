const express = require('express')
const articuloModel = require('./models/Articulo')
const comentarioModel = require('./models/Comentario')
const estudianteModel = require('./models/Estudiante')
const app = express()

app.post('/articulos', async (request, response) => {
  const articulo = new articuloModel(request.body)

  try {
    await articulo.save()
    response.send(articulo)
  } catch (error) {
    response.status(500).send(error)
  }
})

app.get('/articulos', async (request, response) => {
  const articulos = await articuloModel.find({})

  try {
    response.send(articulos)
  } catch (error) {
    response.status(500).send(error)
  }
})

app.post('/comentarios', async (request, response) => {
  const comentario = new comentarioModel(request.body)

  try {
    await comentario.save()
    response.send(comentario)
  } catch (error) {
    response.status(500).send(error)
  }
})

app.get('/comentarios', async (request, response) => {
  const comentarios = await comentarioModel.find({})

  try {
    response.send(comentarios)
  } catch (error) {
    response.status(500).send(error)
  }
})

app.post('/estudiantes', async (request, response) => {
  const estudiante = new estudianteModel(request.body)

  try {
    await estudiante.save()
    response.send(estudiante)
  } catch (error) {
    response.status(500).send(error)
  }
})

app.get('/estudiantes', async (request, response) => {
  const estudiantes = await estudianteModel.find({})

  try {
    response.send(estudiantes)
  } catch (error) {
    response.status(500).send(error)
  }
})

module.exports = app
