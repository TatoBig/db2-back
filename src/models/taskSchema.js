import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  done: {
    type: Boolean,
    required: true,
    default: false
  }
})

taskSchema.plugin(timestamps)
taskSchema.index({ createdAt: 1, updatedAt: 1 })

export default taskSchema
