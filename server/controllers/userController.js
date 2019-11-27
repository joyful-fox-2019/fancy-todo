const User = require('../models/user');
const {
    hashPassword,
    comparePassword
} = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');
class UserController {
    static register(req, res, next) {
        // console.log('masuk');
        let {
            name,
            email,
            password
        } = req.body;
        password = hashPassword(password);
        User.create({
                name,
                email,
                password
            })
            .then(user => {
                res.status(201).json(user);
            })
            .catch(next)
    }

    static login(req, res, next) {
        // console.log('masuk')
        let {
            email,
            password
        } = req.body;
        User.findOne({
                email
            })
            .then(user => {
                if (!user) {
                    next({
                        message: 'Username/Password is wrong!'
                    })
                } else {
                    if (!comparePassword(password, user.password)) {
                        next({
                            message: 'Username/Password is wrong!'
                        });
                    } else {
                        const payloadjwt = {
                            id: user._id,
                            email: user._email
                        }
                        let token = jwt.getToken(payloadjwt);
                        res.status(200).json({
                            token
                        })
                    }
                }
            })
            .catch(next);
    }

    static googleLogin(req, res, next) {
        // console.log('masuk')
        // console.log(req.decoded);
        User.findOne({
                email: req.decoded.email
            })
            .then(user => {
                if (user) {
                    console.log('user sudah ada');
                    return user;
                } else {
                    console.log('user belum ada');
                    return User.create({
                        name: req.decoded.given_name,
                        email: req.decoded.email,
                        password: hashPassword(process.env.DEFAULT_PASSWORD)
                    })
                }
            })
            .then(user => {
                const payloadjwt = {
                    id: user._id,
                    email: user.email
                }
                let token = jwt.getToken(payloadjwt);
                res.status(201).json({
                    token
                })
            })
            .catch(next);
    }
};

module.exports = UserController;