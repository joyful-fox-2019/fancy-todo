const routes = require('express').Router();

routes.use('/user', require('./users'));
routes.use('/todos', require('./todos'));

module.exports = routes;
