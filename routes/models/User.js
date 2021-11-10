var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tasks: [{
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
  }],
  createdAt: {
    type: Date,
    required: true
  }
});

const User = mongoose.model('User', UserSchema)

module.exports = User