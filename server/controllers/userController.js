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
                    let token = jwtHelper.generate(user.email);
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

    }
}

module.exports = UserController;