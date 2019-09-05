const express = require('express')
var cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())

const actionsRouter = require('./actions/actionsRouter.js')
const projectsRouter = require('./projects/projectsRouter.js')



server.use('/actions', actionsRouter)
server.use('/projects', projectsRouter)

server.get('/', (req, res) => {
  res.send(`<h2>API is UP</h2>`)
})

module.exports = server;