const mongoose = require('mongoose')

const ArticuloSchema = new mongoose.Schema({
  titulo: String,
  articulo: String,
  fecha: Date,
  Estudiante_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  EstudianteAutorizacion_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

const Articulo = mongoose.model('Articulo', ArticuloSchema)

module.exports = Articulo
