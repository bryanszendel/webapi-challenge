const express = require('express')

const actionsRouter = require('./actions/actionsRouter.js')
const projectsRouter = require('./projects/projectsRouter.js')

const server = express()

server.use(express.json())

server.use('/actions', actionsRouter)
server.use('/projects', projectsRouter)

server.get('/', (req, res) => {
  res.send(`<h2>API is UP</h2>`)
})

module.exports = server;