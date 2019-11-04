const routes = require('express').Router();
const projectController = require('../controllers/project')
const todoController = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const { authorizationProject } = require('../middlewares/authorization')

routes.use(authentication)
routes.post('/', projectController.create)
routes.delete('/:projectid', projectController.delete)
routes.patch('/member/:id', projectController.addMember)
routes.get('/', projectController.findAll)
routes.get('/user', projectController.findUser)
routes.get('/one/:id', projectController.findOne)


routes.use('/todo/:projectid/:id', authorizationProject)
routes.get('/todo/:projectid', todoController.findTodoProject)
routes.post('/todo/:projectid', todoController.create)
routes.put('/todo/:projectid/:id', todoController.update)
routes.delete('/todo/:projectid/:id', todoController.delete)



module.exports = routes