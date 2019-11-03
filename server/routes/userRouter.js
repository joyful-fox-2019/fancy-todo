const router = require('express').Router()
const userController = require('../controllers/userController')
const loginGoogle = require('../middlewares/googleLogin')


router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/login-google', loginGoogle, userController.loginGoogle)


module.exports = router