const { Todo } = require('../models');

class TodoController {
	static postNewTodo(req, res, next) {
		Todo.create({
			name: req.body.name,
			description: req.body.description,
			user_id: req.body.user_id
		})
			.then(todo => {
				res.status(201).json(todo);
			})
			.catch(next);
	}
	static getUserTodos(req, res, next) {}
	static getOneUserTodo(req, res, next) {}
	static updateTodo(req, res, next) {}
	static deleteTodo(req, res, next) {}
}

module.exports = TodoController;
