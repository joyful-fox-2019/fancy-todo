const routes = require('express').Router()
const todoController = require('../controllers/todo')
const { authentication, authorization } = require('../middlewares/oauth')

routes.use(authentication)
routes.get('/', todoController.findAll)
routes.post('/' ,todoController.create)
routes.put('/:id', authorization ,todoController.updatePut)
routes.patch('/:id', authorization ,todoController.updatePatch)
routes.delete('/:id', authorization ,todoController.delete)
routes.get('/:id', authorization ,todoController.findId)
routes.get('/:title', authorization ,todoController.findTitle)

module.exports = routes