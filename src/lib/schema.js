const { gql } = require('apollo-server');

const schema = gql`
    type Task {
      title: String!
      description: String
      done: Boolean!
      updatedAt: String!
      createdAt: String!
    }

    type Auth {
      auth: Boolean!
      username: String
      id: ID
    }

    type Group {
      _id: ID!
      name: String!
      description: String
      members: [User!]
      tasks: [Task!]
      createdAt: String!
      updatedAt: String!
    }

    type User {
      _id: ID!
      fullId: String
      username: String
      password: String
      tasks: [Task!]
      createdAt: String!
      updatedAt: String!
      email: String
    }

    input UserInput {
      id: String!
      email: String!
    }

    input GroupInput {
      name: String!
      description: String
      members: [String!]
    }

    input TaskInput {
      userId: String!
      title: String!
      description: String
      done: Boolean
      index: Int
    }

    type Query {
      groups: [Group!]!
      users: [User!]!
      getUserData(id: ID!): User
      login(id: String!): Auth! 
      loginGoogle(email: String!, username: String!, uid: String!): Auth!
    }

    type Mutation {
      createGroup(groupInput: GroupInput): Group 
      createUser(userInput: UserInput): User
      createTask(taskInput: TaskInput): User
      updateTask(taskInput: TaskInput): User
      deleteTask(userId: String!, index: Int!): User
    }
`

export default schema