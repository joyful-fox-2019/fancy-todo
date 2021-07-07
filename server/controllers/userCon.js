const User = require('../models/user')
const {hash, check} = require('../middlewares/bcrypt')
const {generateToken, verifyToken} = require('../middlewares/jwt')

class UserController {

    static register(req, res, next) {
        if (!req.body.password) throw { message: 'You should enter your password'}
        let password = hash(req.body.password)
        User.create({
            name: req.body.name,
            email: req.body.email,
            password
        })
            .then((newUser) => {
                res.status(201).json(newUser)
            }).catch(next)
    }

    static login(req, res, next) {
        console.log('masuk login');
        User.findOne({
            email : req.body.email
        })
            .then((user) => {
                let passwordInput = req.body.password
                let passwordDb = user.password
                let isPassword = check(passwordInput, passwordDb)

                if (!isPassword) throw {message: 'Email/Password is wrong'}
                let payload = {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
                let token = generateToken(payload)
                console.log('ini token jwt:', token)
                res.status(200).json({token})
            }).catch(next)
    }

    static googleSignIn(req,res,next) {
        
        User.findOne({
            email : req.headers.email
        })
            .then((user) => {
                if (user) {
                    return user
                } else {
                    let password = hash(process.env.PRIVATE_KEY)
                    return User.create({
                    name: req.headers.name,
                    email: req.headers.email,
                    password
                    })
                }
            })
            .then((user) => {
                let payload = {
                    id : user._id,
                    name: user.name,
                    email: user.email
                }
                let token = generateToken(payload)
                res.status(200).json({token})
            })
            .catch(next)
    }
}

module.exports = UserController