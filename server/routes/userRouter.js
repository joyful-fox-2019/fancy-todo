const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.readAll)
router.post('/', userController.create)
router.post('/login',userController.login)
router.post('/googlin', userController.googleLogin)

module.exports = router 