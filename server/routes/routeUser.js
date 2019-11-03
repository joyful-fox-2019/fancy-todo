const route = require('express').Router()
const ControllerUser = require('../controllers/user')

route.post('/register', ControllerUser.register)
route.post('/login', ControllerUser.login)
route.post('/googleSignIn', ControllerUser.googleSignIn)

module.exports = route