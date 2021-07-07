const project = require('express').Router()
const {findOne,findAll,createProject,addMember,addTodo,updateTodo,removeTodo} = require('../controllers/projectController')
const auth = require('../middlewares/auth').authentication
const authz = require('../middlewares/auth').authorization
const authzCRUD = require('../middlewares/auth').authorizationCRUD
const authzCreate = require('../middlewares/auth').authorizationCreator

project.get('/',findAll)
project.get('/getproject',auth,findOne)
project.post('/create',auth,createProject)
project.post('/addmember/:_id',auth,authzCreate,addMember)
project.post('/addtodo/:_id',auth,authzCRUD,addTodo)
project.patch('/:_id/:todoid',auth,authzCRUD,updateTodo)
project.delete('/:_id/:todoid',auth,authzCRUD,removeTodo)

module.exports = project