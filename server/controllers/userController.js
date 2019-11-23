const User = require('../models/user');
const Password = require('../helpers/password')
const jwt = require('../helpers/jwtHandler')

class UserController {
    static login(req,res,next){
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(user){
                let valid = Password.compare(req.body.password, user.password);
                if(valid){
                    let jwt_token = jwt.generateToken({id: user._id})
                    res.status(200).json({jwt_token, user})
                }else{
                    res.status(400).json({
                        msg: 'Your password is wrong'
                    })
                }
            }else{
                res.status(400).json({
                    msg: 'Your email is not registered'
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static register(req,res,next){
        if(req.body.password === '' || req.body.password === null){
            res.status(400).json({
                msg: 'Password cannot be empty'
            })
        }
        let newPassword = Password.hashPassword(req.body.password)
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(err=>{
            next(err)
        })
    }

    static googleLogin(req,res,next){
        User.findOne({
            email: req.user.email
        })
        .then(user => {
            if(user){
                return user
            }else{
                let newPassword = Password.hashPassword(process.env.DEFAULT_PASSWORD);
                return User.create({
                    name: req.user.name,
                    email: req.user.email,
                    password: newPassword
                })
            }
        })
        .then(user => {
            let jwt_token = jwt.generateToken({id: user._id})
            res.status(200).json({jwt_token, user});
        })
        .catch(err => {
            next(err)
        })
    }   
}

module.exports = UserController;