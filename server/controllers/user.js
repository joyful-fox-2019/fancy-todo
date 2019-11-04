const User = require('../models/user')
const { hash, compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {

    static register(req, res, next) {
        let { name, email, password } = req.body
        // const hashPassword = hash(password)
        User.create({ name, email, password })
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(next)
    }

    static login(req, res, next) {
        let { email, password } = req.body
        console.log(req.body);
        User.findOne({
            email: email
        })
            .then(user => {
                console.log(user);
                console.log(req.body.password, user.password)
                let sync = compare(password, user.password)
                console.log(sync)
                if (sync) {
                    let name = user.name,
                        email = user.email,
                        _id = user._id
                    const token = generateToken({
                        name: user.name,
                        email: user.email,
                        _id: user._id
                    })
                    console.log(token);
                    res.status(200).json({ token, name, email, _id })
                }
                else next({ status: 403, message: 'Invalid password or email' })
            })
            .catch(err => {
                console.log(err);
                next({ status: 404, message: 'Invalid Email or Password' })
            })
    }

    static googleLogin(req, res, next) {
        console.log('guuugeeeellll')
        let gPayload = ''
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                gPayload = ticket.getPayload()
                console.log(gPayload);
                return User.findOne({
                    email: gPayload.email
                })
            })
            .then((user) => {
                if (user) {
                    console.log(user);
                    return user
                } else {
                    return User.create({
                        name: gPayload.name,
                        email: gPayload.email,
                        isGoogle: true,
                        password: 'google'
                    })
                }
            })
            .then(user => {
                console.log(user)
                let name = user.name,
                    email = user.email,
                    _id = user._id
                let payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
                let token = generateToken(payload)
                console.log(token);
                res.status(200).json({ token, name, email, _id })
            })
            .catch(next)
    }


}

module.exports = UserController