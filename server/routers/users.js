const router = require('express').Router()
const UserController = require('../controllers/user')
const googleVerify = require('../middlewares/googleVerify')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(googleVerify)
router.post('/g-signin', UserController.googleSignIn)

module.exports = router