const project = require('express').Router()
const {findOne,findAll,createProject,addMember,addTodo} = require('../controllers/projectController')
const auth = require('../middlewares/auth').authentication
const authz = require('../middlewares/auth').authorization
const authzCreate = require('../middlewares/auth').authorizationCreator

project.get('/',findAll)
project.get('/getproject',auth,findOne)
// project.post('/create',auth,authzCreate,createProject)
// project.post('/addmember',auth,authzCreate,addMember)
project.post('/create',auth,createProject)
project.post('/addmember/:_id',auth,authzCreate,addMember)
project.post('/addtodo/:_id',auth,addTodo)

module.exports = project