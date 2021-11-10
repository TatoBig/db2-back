var mongoose = require('mongoose')
var Schema = mongoose.Schema

var GroupsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [
    {
      role: {
        type: String
      },
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  tasks: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      done: {
        type: Boolean,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    required: true
  }
})
const Groups = mongoose.model('Groups', GroupsSchema)

module.exports = Groups
