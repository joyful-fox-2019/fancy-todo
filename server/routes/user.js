const user = require('express').Router()
const {add,findAll,login,addCreator} = require('../controllers/userController')

user.post('/register',add)
// user.post('/registercreator',addCreator)
user.post('/login',login)
user.get('/',findAll)

module.exports = user