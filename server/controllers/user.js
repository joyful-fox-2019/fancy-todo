const User = require('../models/User');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/generateJWT');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
    static register(req, res, next) {
        User
            .findOne({
                email: req.body.email
            })
            .then( data => {
                if (data) {
                    console.log('user already exist', data);
                } else {
                    User
                        .create(req.body)
                        .then( data => {
                            res.status(201).json(data);
                        })
                        .catch( err => {
                            res.status(500).json(err);
                        });
                }   
            })
    }

    static login(req, res, next) {
        User
            .findOne({
                email: req.body.email
            })
            .then( data => {
                if (data) {
                    let valid = bcrypt.verifyPassword(req.body.password, data.password);
                    if (valid) {
                        let token = jwt({id: data.id, email: data.email});
                        res.status(200).json(token);
                    }
                } else {
                    const err = new Error();
                    err.name = 'validationError';
                    err.status = 401;
                    next(err);
                }
            })
            .catch(next)
    }

    static googleSign(req, res, next) {
        client
			.verifyIdToken({
				idToken: req.body.id_token,
				audience: process.env.GOOGLE_CLIENT_TOKEN
			})
			.then(ticket => {
				const payload = ticket.getPayload();
				User.findOne({ email: payload.email }).then(user => {
					if (user) {
						res.status(200).json({
                            token : jwt({id: user.id, email: user.email})
						});
					} else {
						req.body.isGoogleAccount = true;
						req.body.email = payload.email;
						UserController.register(req, res, next);
					}
				});
			})
			.catch(next);
    }
}

module.exports = UserController;