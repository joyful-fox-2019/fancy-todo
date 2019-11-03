const router = require('express').Router()
const UserController = require('../controllers/user')

router.get('/:username', UserController.findUser)
router.post('/register', UserController.regiser)
router.post('/login', UserController.login)
router.post('/gsignin', UserController.googleSignIn)
router.patch('/update/name', UserController.changeName)

module.exports = router