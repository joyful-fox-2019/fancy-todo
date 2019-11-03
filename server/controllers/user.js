const { User } = require('../models');
const passwordHandler = require('../helpers/passwordHandler');
const tokenHandler = require('../helpers/tokenHandler');
const googleVerify = require('../helpers/googleVerify');

class UserController {
	static verifyToken(req, res, next) {
		try {
			const payload = tokenHandler.decode(req.body.jwt_token);
			User.findById(payload.id)
				.then(user => {
					if (user) {
						res.status(200).json(payload);
					} else {
						throw 'tokenFailed';
					}
				})
				.catch(next);
		} catch (err) {
			next('tokenFailed');
		}
	}

	static getUser(req, res, next) {
		console.log(req.params.id);
		User.findById(req.params.id)
			.populate('todos')
			.then(user => {
				if (user) res.status(200).json(user);
				else throw 'userNotFound';
			})
			.catch(next);
	}

	static signin(req, res, next) {
		User.findOne({ username: req.body.username })
			.then(user => {
				if (user) {
					try {
						if (passwordHandler.verify(req.body.password, user.password)) {
							const token = tokenHandler.encode({
								id: user.id,
								username: user.username
							});
							res.status(200).json({
								jwt_token: token
							});
						} else {
							throw 'invalidSignin';
						}
					} catch (err) {
						throw err;
					}
				} else {
					throw 'invalidSignin';
				}
			})
			.catch(next);
	}

	static register(req, res, next) {
		User.create({
			username: req.body.username || undefined,
			email: req.body.email,
			password: req.body.password,
			todos: []
		})
			.then(user => {
				const token = tokenHandler.encode({
					id: user.id,
					username: user.username
				});
				res.status(201).json({
					jwt_token: token
				});
			})
			.catch(errAll => {
				const err = [];
				if (errAll.message.includes('expected `username` to be unique')) {
					err.push('usernameUniqueFailed');
				}
				if (errAll.message.includes('expected `email` to be unique')) {
					err.push('emailUniqueFailed');
				}
				next(err);
			});
	}

	static googleSigning(req, res, next) {
		googleVerify(req.body.g_token)
			.then(payload => {
				if (payload) {
					req.body.email = payload.email;
					return User.findOne({ email: payload.email });
				}
				throw 'googleSigninFailed.';
			})
			.then(user => {
				if (user) {
					const token = tokenHandler.encode({
						id: user.id,
						username: user.username
					});
					res.status(200).json({
						jwt_token: token
					});
				} else {
					req.body = {
						email: req.body.email,
						todos: []
					};
					UserController.register(req, res, next);
				}
			})
			.catch(next);
	}
}

module.exports = UserController;
