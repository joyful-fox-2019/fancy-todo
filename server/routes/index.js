const router = require('express').Router();
const UserController = require('../controllers/userController');
const googleVerify = require('../middlewares/googleVerify');
const TodoRoutes = require('./todoRoute');

router.get('/', (req, res)=>{
    res.send('hello from server')
})

router.use('/todos', TodoRoutes);

router.post('/register', UserController.register);
router.post('/signin', UserController.signin);
router.post('/google-signin', googleVerify, UserController.googleSignin);


module.exports = router;