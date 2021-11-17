import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import typeDefs from './lib/schema'
import resolvers from './lib/resolvers'
const { ApolloServer, gql } = require('apollo-server');

const app = express()

app.use(bodyParser.json());

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Aplicación de Apollo 🚀 en ${url}`);
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.bh59q.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Aplicación conectada con MongoDB')
  })
  .catch(err => {
    console.log(err)
  })
