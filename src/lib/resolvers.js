import User from '../models/user'
import Group from '../models/group'
import mongoose from 'mongoose'

const resolvers = {
  Query: {
    groups: async () => {
      try {
        const groups = await Group.find().populate('members')
        return groups
      } catch (error) {
        return error
      }
    },
    users: async () => {
      try {
        const users = await User.find()
        return users.map(user => {
          return Object.defineProperty(user, 'password', {
            value: null
          })
        })
      } catch (error) {
        return error
      }
    },
    login: async (_, { id }) => {
      try {
        const foundUser = await User.findById(transformId(id))
        if (!foundUser) {
          return false
        }
        return {
          auth: true, username: foundUser.username, id: foundUser.id
        }
      } catch (error) {
        return error
      }
    },
    loginGoogle: async (_, { email, username, uid }) => {
      try {
        const foundUser = await User.findOne({ email: email })
        if (!foundUser) {
          const user = new User({
            email: email,
            username: username,
            _id: mongoose.Types.ObjectId(uid.substring(0, 12)),
            fullId: uid
          })
          const result = await user.save()
          return {
            auth: true, username: username, id: result.id
          }
        }
        return {
          auth: true, username: username, id: foundUser.id
        }
      } catch (error) {
        console.log(error)
        return error
      }
    },
    getUserData: async (_, { id }) => {
      try {
        const foundUser = await User.findById(id)
        if (!foundUser) {
          return null
        }
        return foundUser
      } catch (error) {

      }
    }
  },
  Mutation: {
    createGroup: async (_, { groupInput }) => {
      try {
        let group
        if (groupInput.members.length > 0) {
          for (const member of groupInput.members) {
            const foundUser = await User.findById(member)
            if (!foundUser) {
              return new Error('El usuario no fue encontrado')
            }
          }
          group = new Group({
            name: groupInput.name,
            description: groupInput.description,
            members: groupInput.members
          })
        } else {
          group = new Group({
            name: groupInput.name,
            description: groupInput.description
          })
        }
        const result = await group.save()
        return result
      } catch (error) {
        return error
      }
    },
    createUser: async (_, { userInput }) => {
      try {
        const foundUser = await User.findOne({
          email: userInput.email
        })
        if (foundUser) {
          return new Error('El usuario ya esta registado')
        }
        const user = new User({
          _id: mongoose.Types.ObjectId(userInput.id.substring(0, 12)),
          fullId: userInput.id,
          email: userInput.email,
          username: userInput.email
        })
        const result = await user.save()
        return result
      } catch (error) {
        return error
      }
    },
    createTask: async (_, { taskInput }) => {
      try {
        const foundUser = await User.findById(taskInput.userId)
        if (!foundUser) {
          return new Error('El usuario no fue encontrado')
        }
        const task = {
          title: taskInput.title,
          description: taskInput.description,
          done: taskInput.done
        }
        foundUser.tasks.push(task)
        const result = await foundUser.save()
        return result
      } catch (error) {
        return error
      }
    },
    updateTask: async (_, { taskInput }) => {
      try {
        const foundUser = await User.findById(taskInput.userId)
        if (!foundUser) {
          return new Error('El usuario no fue encontrado')
        }
        foundUser.tasks.map((task, index) => {
          if (index === taskInput.index) {
            task.title = taskInput.title
            task.description = taskInput.description
            task.done = taskInput.done
            return { ...task }
          } else {
            return { ...task }
          }
        })
        const result = foundUser.save()
        return result
      } catch (error) {
        return error
      }
    },
    deleteTask: async (_, { userId, index }) => {
      try {
        const foundUser = await User.findById(userId)
        if (!foundUser) {
          return new Error('El usuario no fue encontrado')
        }
        foundUser.tasks.splice(index, 1);
        const result = foundUser.save()
        return result
      } catch (error) {
        return error
      }
    }
  }
}

const transformId = (firebaseId) => mongoose.Types.ObjectId(firebaseId.substring(0, 12)).toString()

export default resolvers
