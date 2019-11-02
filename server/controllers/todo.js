const { Todo } = require('../models');
const { User } = require('../models');

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

	static getOneTodo(req, res, next) {
		Todo.findById(req.params.id)
			.then(todo => {
				if (todo) res.status(200).json(todo);
				else throw 'todoNotFound';
			})
			.catch(next);
	}

	static updateTodo(req, res, next) {
		Todo.findByIdAndUpdate(req.params.id, {
			name: req.body.name,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date
		})
			.then(() => {
				res.status(200).json({});
			})
			.catch(next);
	}

	static deleteTodo(req, res, next) {
		Todo.findByIdAndDelete(req.params.id)
			.then(() => {
				res.status(200).json({});
			})
			.catch(next);
	}
}

module.exports = TodoController;
