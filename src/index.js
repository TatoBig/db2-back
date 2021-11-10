import dotenv from 'dotenv'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import mongoose from 'mongoose'

import './utils/db'
import schema from './schema'

dotenv.config()

const app = express()

async function startServer() {
  const apolloServer = new ApolloServer({
    schema,
    cors: true,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    path: '/'
  })
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    path: '/',
    cors: true,
    onHealthCheck: () =>
      new Promise((resolve, reject) => {
        if (mongoose.connection.readyState > 0) {
          resolve()
        } else {
          reject()
        }
      })
  })
}

startServer()

app.listen({ port: process.env.PORT }, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}`)
  console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`)
})

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bh59q.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`)

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'Error de conexión: '))
// db.once('open', function () {
//   console.log('Conexión exitosa')
// })

// app.use(Router)

// app.listen(8080, () => {
//   console.log('El servidor esta en el puerto 8080')
// })
