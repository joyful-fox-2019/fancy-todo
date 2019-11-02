const router = require('express').Router();
const UserController = require('../controllers/userController');
const googleVerify = require('../helpers/googleVerify');

router.get('/', (req, res)=>{
    res.send('hello from server')
})

router.post('/register', UserController.register);
router.post('/signin', UserController.signin);
router.post('/google-signin', googleVerify, UserController.googleSignin);


module.exports = router;