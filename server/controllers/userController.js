const User = require('../models/user')
const jwt = require('../helpers/jwt')
const { check } = require('../helpers/hashPassword')
const { OAuth2Client } = require('google-auth-library')

class UserController {

    static readAll (req,res,next) {
        User.find({})
            .then(function (users) {
                res.status(200).json(users)
            })
            .catch(next)
    };

    static create (req,res,next) {
        
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(function (newUser) {
           
            res.status(201).json(newUser)
        })
        .catch(next)
    };

    static login (req,res,next) {
       
        User.findOne({username: req.body.username})
            .then(function (user) {
                if (user) {
                    
                    if (check(req.body.password, user.password)) {
                        
                        let payload = {
                            id: user.id,
                            username: user.username
                        }
                        let token = jwt.generateToken(payload)
                        
                        req.headers.token = token
                        res.status(202).json({'access_token': token})
                    }else {
                        next({status: 404, message: `Invalid Username / Password`})
                    }
                }else {
                    next({status: 404, message: `Invalid Username / Password`})
                }
            })
            .catch (next)
    };

    static googleLogin(req, res,next) {
        const client = new OAuth2Client(process.env.GOOGLECLIENTID)

        client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.GOOGLECLIENTID
            })
            .then(ticket => {
                const payload = ticket.getPayload();
                const generateToken = jwt.sign(payload, process.env.secret)
                res.status(200).json(generateToken)
            })
            .catch(next)
    }

}//

module.exports = UserController