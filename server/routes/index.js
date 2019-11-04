const routes = require('express').Router();
const userRouter = require('./user')
const todoRouter = require('./todo')
const projectRouter = require('./project')

routes.use('/user', userRouter)
routes.use('/todo', todoRouter)
routes.use('/project', projectRouter)

module.exports = routes