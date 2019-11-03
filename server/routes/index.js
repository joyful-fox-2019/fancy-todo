const route = require('express').Router()
const routeUser = require('./routeUser')
const routeTodo = require('./routeTodo')

const authenticate = require('../middlewares/authenticate')

route.get('/', function(req, res){
  res.send('ini home')
})

route.use('/user', routeUser)
route.use('/todo', authenticate, routeTodo)

module.exports = route