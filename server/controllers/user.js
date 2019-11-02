const User = require('../models/user')
const {hashPassword, verifyPassword} = require('../helpers/hashPassword')
const {getToken, verifyToken} = require('../helpers/tokenGenerator')

class UserController {

    static showAll(req,res){
        User.find()
        .then(users => { 
            res.status(200).json(users)
            console.log(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static register(req,res){
        User.create({
            full_name : req.body.full_name,
            username : req.body.username,
            email : req.body.email,
            password : hashPassword(req.body.password)
        })
        .then(user => {
            res.status(200).json(user)
            console.log(user)
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
    }

    static delete(req,res){
        let query = {
            _id : req.params.id
        }
        User.findOneAndDelete(query)
        .then(user => {
            res.status(200).json(user)
            console.log(user)
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
    }

    static signin(req,res){
        User.findOne({
            email : req.body.email
        })
        .then(user => {
            if(user && verifyPassword(req.body.password,user.password)){
                let payloads = {
                    username : user.username,
                    email : user.password
                }
               let token = getToken(payloads)
               res.status(200).json(token)
            }else{
                res.status(500).json({message : "invalid username/password"})
            }
        })
        .catch(err => {
            res.status(500).json({message : "invalid username/password"})
            console.log(err)
        })

    }

}

module.exports = UserController