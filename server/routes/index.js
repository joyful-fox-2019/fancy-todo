const router = require('express').Router();
const UserController = require('../controllers/user');
const TodoRouter = require('./todo');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/gSignIn', UserController.googleSign);
router.use('/todos', TodoRouter);

module.exports = router;