const user = require('express').Router()
const {add,findAll,login,loginOAuth,findOne} = require('../controllers/userController')

user.get('/:_id',findOne)
user.get('/',findAll)
user.post('/register',add)
user.post('/login',login)
user.post('/OAuth',loginOAuth)

module.exports = user