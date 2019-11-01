const routes = require('express').Router()
const user = require('./user')
const todo = require('./todo')
const project = require('./project')

routes.use('/users',user)
routes.use('/todos',todo)
routes.use('/projects',project)

module.exports = routes