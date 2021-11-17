import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'
import taskSchema from './taskSchema'

const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  tasks: [taskSchema]
})

groupSchema.plugin(timestamps)
groupSchema.index({ createdAt: 1, updatedAt: 1 })

const Group = mongoose.model('Group', groupSchema)
export default Group
