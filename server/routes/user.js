const router = require('express').Router();
const User = require('../controllers/userController');
const verify = require('../middleware/googleVerify');

router.post('/register', User.register);
router.post('/login', User.login);
router.post('/googleLogin', verify, User.googleLogin);

module.exports = router