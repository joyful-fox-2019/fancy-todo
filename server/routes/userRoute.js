const router = require('express').Router()
const UserController = require('../controllers/userController')
const {authentication} = require('../middlewares/authentication')

router.get('/', authentication, UserController.getUser)

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/goauth', UserController.googleOauth)

router.post('/mailer', authentication, UserController.mailer)

module.exports = router