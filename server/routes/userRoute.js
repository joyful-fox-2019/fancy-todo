const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const googleAuth = require('../middlewares/googleAuth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleLogin', googleAuth, userController.googleLogin)

module.exports = router;