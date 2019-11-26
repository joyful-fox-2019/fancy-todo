const routes = require('express').Router();
const TodoController = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

routes.use(authentication)
routes.get('/', TodoController.findall)
routes.post('/', TodoController.create)
routes.get('/one/:id', TodoController.findOne)

routes.use('/:id', authorization)
routes.delete('/:id', TodoController.delete)
routes.put('/:id', TodoController.update)

module.exports = routes
