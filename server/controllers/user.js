const User = require('../models/user')
const {
    compare
} = require('../helpers/bcrypt')
const {
    getToken
} = require('../helpers/jwtoken')

class UserController {
    static register(req, res, next) {
        if (!req.body.email || !req.body.password) {
            next('EF')
        }
        User.create({
                email: req.body.email,
                password: req.body.password
            })
            .then(user => {
                let token = getToken(user._id)
                let name = user.full_name
                res.status(201).json({
                    token,
                    name
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        if (!req.body.email || !req.body.password) {
            next('EF')
        }
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) {
                    throw `User with email ${req.body.email} doesn't exists`
                } else {
                    let name = user.full_name
                    let valid = compare(req.body.password, user.password)
                    if (valid) {
                        let token = getToken(user._id)
                        res.status(200).json({
                            message: {
                                token,
                                name
                            },
                        })
                    } else {
                        throw 'Wrong email/password'
                    }
                }
            })
            .catch(next)
    }

    static googleLogin(req, res, next) {
        let status = 200
        User.findOne({
                email: req.decoded.email
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    status += 1
                    return User.create({
                        email: req.decoded.email,
                        password: process.env.PASSWORD_DEFAULT
                    })
                }
            })
            .then(googleUser => {
                let id = googleUser._id
                let tokenUser = getToken(id)
                res.status(status).json({
                    name: req.decoded.name,
                    token: tokenUser
                })

            })
            .catch(next)
    }
}

module.exports = UserController