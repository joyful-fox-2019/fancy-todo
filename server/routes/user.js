const router = require('express').Router()
const userController = require('../controllers/user')
const googleVerify = require('../middlewares/googleVerify')

//register
router.post('/', userController.register)
//login
router.post('/login', userController.login)
//google login
router.post('/google', googleVerify, userController.googleLogin)



module.exports = router