const mongoose = require('mongoose')

const EstudianteSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  noAprobaciones: Number,
  noArticulos: Number,
  noComentarios: Number,
  usuario: String,
  password: String
})

const Estudiante = mongoose.model('Estudiante', EstudianteSchema)

module.exports = Estudiante