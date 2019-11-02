const todos = require('express').Router();
const { TodoController } = require('../controllers');

todos.post('/', TodoController.postNewTodo);
todos.put('/:id', TodoController.updateTodo);
todos.delete('/:id', TodoController.deleteTodo);
todos.get('/:id', TodoController.getOneTodo);

module.exports = todos;
