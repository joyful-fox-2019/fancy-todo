const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/loginGoogle', UserController.googleLogin)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/weather/:city', UserController.findWeather)
router.get('/', UserController.findAllUser)

module.exports = router