const router = require('express').Router()
const UserController = require('../controllers/user')
const { googleVerify } = require('../middlewares/googleVerify')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleSignIn', googleVerify, UserController.googleSignIn)

module.exports = router
