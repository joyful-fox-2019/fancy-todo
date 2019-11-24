const router = require('express').Router();
const userController = require('../controllers/UserController.js');

router.post('/signin', userController.login);
router.post('/googlesignin', userController.googleSignIn);
router.post('/register', userController.register);

module.exports = router