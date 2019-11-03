`use strict`
const User = require('../models/user')
const comparePassword = require('../helpers/comparePassword')
const generateToken = require('../helpers/generateToken')


class userController{
    
    static register(req, res, next) {
        User.create({
            email : req.body.email,
            password : req.body.password
        })
        .then( user => {
            res.json({
                msg : `${user.email} is succesfully registered`
            })
        })
        .catch(next)
    }

    static login(req, res, next) {
        console.log(req.body)
        User.findOne({
            email : req.body.email
        })
        .then(user => {            
            if (user) {
                let valid = comparePassword(req.body.password, user.password) // input dicompare server
                if ( valid ) {                    
                    let token = generateToken(user)  
                    res.json({
                        msg : 'login succes',
                        token : token                        
                    })
                } else {
                    next({
                        name : 'WrongPassword'
                    })
                }
            } else {
                next({
                    name : 'DataError'
                })
            } 
        })
        .catch(err => {
            next(err)
        })
    }

    static loginGoogle(req, res, next) {        
        let { email } = req.decoded
        User.findOne({
            email : email
        })
        .then( user => {
            let password = email+'tes'
            if (!user) {
                return User.create({email, password})
            } else {
                return user
            }
        })
        .then(user => {            
            let token = generateToken(user)  
            res.json({
                status : 200,
                msg : 'you are login',
                token : token
            })                     
        })
        .catch( err => {
            console.log(err)
        }) 
                   
    }
}

module.exports = userController