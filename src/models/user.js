import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'
import { composeWithMongoose } from 'graphql-compose-mongoose'

var UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true
    }
    // password: {
    //   type: String,
    //   required: true,
    //   bcrypt: true
    // },
    // tasks: [
    //   {
    //     title: {
    //       type: String,
    //       required: true
    //     },
    //     description: {
    //       type: String
    //     },
    //     done: {
    //       type: Boolean,
    //       required: true,
    //       default: false
    //     }
    //   }
    // ],
  },
  {
    collection: 'users'
  }
)

UserSchema.plugin(require('mongoose-bcrypt'))
UserSchema.plugin(timestamps)

UserSchema.index({ createdAt: 1, updatedAt: 1 })

export const User = mongoose.model('User', UserSchema)
export const UserTC = composeWithMongoose(User)
