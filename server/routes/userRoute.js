const router = require('express').Router()
const UserController = require('../controllers/user')


router.post('/signup', UserController.register)
router.post('/signin', UserController.login)
router.post('/googleLogin', UserController.googleLogin)

module.exports = router