const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.post('/googleSign', UserController.googleSign)
router.get('/',UserController.findAll)

module.exports = router