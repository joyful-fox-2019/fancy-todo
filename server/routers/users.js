const router = require('express').Router()
const UserController = require('../controllers/user')
const googleVerify = require('../middlewares/googleVerify')
const { authentication } = require('../middlewares/auth')

router.get('/', authentication, UserController.find)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(googleVerify)
router.post('/g-signin', UserController.googleSignIn)


module.exports = router