const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static register (req,res,next) {
        const {username,password,email} = req.body
        User.create({username,password,email})
            .then(result => {
                let payload = {email:result.email, _id:result._id}
                let token = generateToken(payload)
                res.status(201).json({token,username})
            })
            .catch(next)
    }

    static login (req,res,next) {
        const {email,password} = req.body
        User.findOne({email})
        .then(user=>{
            if(user) {
              if(comparePassword(password,user.password)){
                let payload = {email:user.email, _id:user._id}
                let token = generateToken(payload)
                res.status(200).json({token, username:user.username})
              }
              else{
                next({ status:400, message:'Wrong Password' })
              }
            } else {
              next({ status:404, message:'Email Not Found' })
            }
        })
        .catch(next)
    }

    static signGoogle(req, res, next){
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let ticketData

        client.verifyIdToken({
          idToken: req.body.id_token,
          audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                ticketData = ticket.getPayload()
                return User.findOne({ email: ticketData.email })
            })
            .then(user => {
                if (user){
                  return user
                }
                else{
                  return User.create({
                    username: ticketData.name,
                    email: ticketData.email,
                    password: process.env.DEFAULT_PASS
                  })
                }
            })
            .then(result => {
                let payload = { email:result.email, _id:result._id }
                let token = generateToken(payload)
                res.status(201).json({
                  token,
                  username: ticketData.name
                })
            })
            .catch(next)
    }
}

module.exports = UserController