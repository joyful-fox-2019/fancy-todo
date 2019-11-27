const routes = require('express').Router();
const userRouter = require('./user');
const todoRouter = require("./todo");

routes.use('/user', userRouter)
routes.use("/todo", todoRouter)


module.exports = routes