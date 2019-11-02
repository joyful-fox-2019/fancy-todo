const User = require("../models/user.js");
const encode = require("../helpers/hashPassword.js");
const jwt = require("../helpers/jwtHandler.js");

class UserController {
    static signup (req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password
        })
        .then((user) => {
            const jwt_token = jwt.generate({ _id: user._id, email: user.email });
            res.status(201).json({ jwt_token: jwt_token });
        })
        .catch((err) => {
            next(err);
        });
    }
    static signin (req, res, next) {
        User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                const valid = encode.compare(req.body.password, user.password);
                if (valid) {
                    const jwt_token = jwt.generate({ _id: user._id, email: user.email });
                    res.status(200).json({ jwt_token: jwt_token });
                }
                else {
                    const err = {
                        status: 400,
                        messages: `Invalid password.`
                    };
                    next(err);
                }
            }
            else {
                const err = {
                    status: 404,
                    messages: `User not found.`
                };
                next(err);
            }
        })
        .catch((err) => {
            next(err);
        });
    }
    static googleSignIn (req, res, next) {
        User.findOne({
            email: req.user.email
        })
        .then((user) => {
            if (user) {
                return user;
            }
            else {
                return User.create({
                    email: req.user.email,
                    password: process.env.DEFAULT_PASSWORD
                });
            }
        })
        .then((verified) => {
            const jwt_token = jwt.generate({ _id: verified._id, email: verified.email });
            res.status(200).json({ jwt_token: jwt_token });
        })
        .catch((err) => {
            next(err);
        });
    }
}

module.exports = UserController;