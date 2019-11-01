const user = require('express').Router()
const {add,findAll,login,loginOAuth} = require('../controllers/userController')

user.post('/register',add)
user.post('/login',login)
user.get('/',findAll)
user.post('/OAuth',loginOAuth)

module.exports = user