const router = require('express').Router()
const UserControlles = require('../controllers/userController')
const googleData = require('../middleware/googleLogin')

router.post('/login', UserControlles.login)
router.post('/register', UserControlles.register)
router.post('/googleSignIn', googleData, UserControlles.loginGoogle)

module.exports = router