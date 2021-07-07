const todo = require('express').Router()
const {findAll,findOne,add,remove,update} = require('../controllers/todoController')
const auth = require('../middlewares/auth').authentication
const authz = require('../middlewares/auth').authorization

todo.get('/',auth,findAll)
todo.post('/',auth,add)
todo.get('/:_id',auth,authz,findOne)
todo.delete('/:_id',auth,authz,remove)
todo.patch('/:_id',auth,authz,update)


module.exports = todo