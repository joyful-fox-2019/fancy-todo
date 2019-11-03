const route = require('express').Router();
const todoRoute = require('./todoRoute.js');
const usersRoute = require('./usersRoute.js');

route.use('/todos', todoRoute);
route.use('/users', usersRoute);

module.exports = route;