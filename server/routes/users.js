const users = require('express').Router();
const { UserController } = require('../controllers');

users.get('/', UserController.getUser);
users.post('/signin', UserController.signin);
users.post('/register', UserController.register);
users.post('/google-signing', UserController.googleSigning);

module.exports = users;
