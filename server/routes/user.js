const routes = require('express').Router();
const UserController = require('../controllers/user')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.post('/google', UserController.loginGoogle)

module.exports = routes