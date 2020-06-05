const UserController = require('../controllers/user')
const verify = require('../middlewares/verifyGoogle')
const routes = require('express').Router()

routes.get('/',UserController.findUser)
routes.post('/signin',UserController.signIn)
routes.post('/signup',UserController.signUp)
routes.post('/googlesignin',verify,UserController.googleSignin)

module.exports = routes
