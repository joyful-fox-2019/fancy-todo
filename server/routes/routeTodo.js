const route = require('express').Router()
const ControllerTodo = require('../controllers/todo')

route.get('/', ControllerTodo.getAll)
route.post('/', ControllerTodo.add)
route.get('/:id', ControllerTodo.getOne)
route.delete('/:id', ControllerTodo.delete)
route.put('/:id', ControllerTodo.update)
route.patch('/:id', ControllerTodo.complete)
route.patch('/:id/important', ControllerTodo.markImportant)


module.exports = route