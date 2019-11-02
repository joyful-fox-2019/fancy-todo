const User = require('../models/user');
const hashHelper = require('../helpers/hashHelper');
const jwtHelper = require('../helpers/jwtHelper');

class UserController {
    static register(req, res) {
        User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
            .then(user => {
                res.status(201).json({ msg: "Register successful" })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static signin(req, res) {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (hashHelper.compare(req.body.password, user.password)) {
                    let token = jwtHelper.generate(user.id);
                    res.status(200).json({ token });
                }
                else {
                    res.status(400).json({ msg: 'Incorrect email and / or password' })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static googleSignin(req, res) {
        User.findOne({
            email: req.decoded.email
        })
            .then(user => {
                if (user) {
                    return user;
                }
                else {
                    return User.create({
                        email: req.decoded.email,
                        username: req.decoded.name,
                        password: process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(user => {
                let token = jwtHelper.generate(user.id);
                res.status(200).json({ token });
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }
}

module.exports = UserController;