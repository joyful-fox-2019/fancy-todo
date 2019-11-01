const Route = require('express').Router();
const userRoute = require('./userRouter');
const todoRoute = require('./todoRouter');
const projectRoute = require('./projectRouter');

Route.use(
  '/users',
  userRoute
)
Route.use(
  '/todos',
  todoRoute
)
Route.use(
  '/projects',
  projectRoute
)

module.exports = Route;