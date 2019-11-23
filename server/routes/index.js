const router = require('express').Router()
const UserRouter = require('./user')
const TodoRouter = require('./todo')
const GoogleVerify = require('../middlewares/googleVerify')
const UserController = require('../controllers/userController')
const errorHandler = require('../middlewares/errorHandler')

router.post('/google-signin', GoogleVerify, UserController.googleLogin)
router.use('/users', UserRouter)
router.use('/todo', TodoRouter)
router.use(errorHandler)

module.exports = router

