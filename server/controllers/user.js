const User = require('../models/user')
const {hashPassword, verifyPassword} = require('../helpers/hashPassword')
const {generateToken, verifyToken} = require('../helpers/tokenGenerator')
const {OAuth2Client} = require("google-auth-library")
const client = new OAuth2Client(process.env.CLIENT_ID)

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
            username : req.body.username
        })
        .then(user => {
            if(user && verifyPassword(req.body.password,user.password)){
                let payloads = {
                    username : user.username,
                    email : user.email
                }
               let token = generateToken(payloads)
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

    static signinGoogle(req,res){
        let id_token = req.body.id_token
        let payloadJWT
        let Email
        let Username
        let password = "qwerty"

        client.verifyIdToken({
            idToken : id_token,
            audience : process.env.CLIENT_ID
        })
        .then(ticket=>{
            const payload = ticket.getPayload()
            Email = payload.email
            Username = payload.email.split('@')[0]
            // console.log(Email)
            return User.findOne({ email : Email })
        })
        .then(user => {
            if(user){
                payloadJWT = {
                    username : user.username,
                    id : user._id
                }
                let token = generateToken(payloadJWT)
                res.status(200).json(token)
            }else{
                User.create({
                    username : Username,
                    email : Email,
                    password: password
                })
                .then(newUser => {
                    payloadJWT = {
                        username : newUser.username,
                        id : newUser._id
                    }
                    let token = generateToken(payloadJWT)
                    res.status(200).json(token)
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = UserController