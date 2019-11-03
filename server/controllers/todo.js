const { Todo } = require('../models');
const { tokenHandler } = require('../helpers');

class TodoController {
	static postNewTodo(req, res, next) {
		const payload = tokenHandler.decode(req.body.jwt_token);
		Todo.create({
			name: req.body.name,
			description: req.body.description,
			due_date: req.body.due_date,
			user_id: payload.id
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
