import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'
import taskSchema from './taskSchema'

const userSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  fullId: String,
  username: String,
  password: String,
  email: String, 
  tasks: [taskSchema]
})

userSchema.plugin(timestamps)
userSchema.index({ createdAt: 1, updatedAt: 1 })

const User = mongoose.model('User', userSchema)
export default User
