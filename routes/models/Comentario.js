const mongoose = require('mongoose')

const ComentarioSchema = new mongoose.Schema({
  comentario: String,
  fecha: Date,
  Estudiante_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  Articulo_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

const Comentario = mongoose.model('Comentario', ComentarioSchema)

module.exports = Comentario
