const todos = require('express').Router();
const { TodoController } = require('../controllers');

todos.post('/', TodoController.postNewTodo);
todos.put('/', TodoController.updateTodo);
todos.delete('/:id', TodoController.deleteTodo);
todos.get('/:username', TodoController.getUserTodos);
todos.get('/:username/:id', TodoController.getOneUserTodo);

module.exports = todos;
