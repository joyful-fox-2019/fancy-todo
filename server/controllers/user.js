const { User } = require('../models');
const passwordHandler = require('../helpers/passwordHandler');
const tokenHandler = require('../helpers/tokenHandler');
const googleVerify = require('../helpers/googleVerify');

class UserController {
	static getUser(req, res, next) {}
	static signin(req, res, next) {
		User.findOne({ username: req.body.username }).then(user => {
			if (user) {
				try {
					if (passwordHandler.verify(req.body.password, user.password)) {
						const token = tokenHandler.encode({
							username: user.username
						});
						res.status(200).json({
							jws_token: token
						});
					} else {
						next('Invalid Username/Password');
					}
				} catch (err) {
					next(err);
				}
			} else {
				next('Invalid Username/Password');
			}
		});
	}
	static register(req, res, next) {
		User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			todos: []
		})
			.then(user => {
				res.status(201).json(user);
			})
			.catch(next);
	}
	static googleSigning(req, res, next) {
		googleVerify(req.body.token)
			.then(payload => {
				console.log(payload);
			})
			.catch(next);
	}
}

module.exports = UserController;
