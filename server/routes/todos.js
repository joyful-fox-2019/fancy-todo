const todos = require('express').Router();
const { TodoController } = require('../controllers');

todos.post('/', TodoController.postNewTodo);
todos.get('/:id', TodoController.getOneTodo);
todos.put('/:id', TodoController.updateTodo);
todos.patch('/:id', TodoController.markComplete);
todos.delete('/:id', TodoController.deleteTodo);

module.exports = todos;
