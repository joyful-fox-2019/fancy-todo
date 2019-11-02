const routes = require('express').Router();
const userRouter = require('./user')

routes.use('/user', userRouter)


module.exports = routes