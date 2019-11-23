const users = require('express').Router();
const { UserController } = require('../controllers');

users.post('/verify-token', UserController.verifyToken);
users.post('/signin', UserController.signin);
users.post('/register', UserController.register);
users.post('/google-signing', UserController.googleSigning);
users.get('/:id', UserController.getUser);

module.exports = users;
