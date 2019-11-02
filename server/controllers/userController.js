const User = require('../models/User')
const {getToken} = require('../helpers/jwt')
const {compareHash} = require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const verifyToken = require('../helpers/jwt').verifyToken

class UserControllers{

  static async add(req,res,next){
    try {
      let { username,email,password } = req.body
      const findUser = await User.findOne(({ email }))
      if(findUser){
        next({status: 409, message: 'email already in use'})
      } else {
        const user = await User.create({ username,email,password })
        let payload = {
          id : user._id,
        }
        let token = getToken(payload)
        let name = user.username
        res.status(201).json({token,name})
      }
    } catch (error) {
      next(error)
    }
  }

  static async findAll(req,res,next){
    try {
      const users = await User.find().populate('todos')
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req,res,next){
    let token = req.params._id
    let decoded = verifyToken(token)
    let _id = decoded.data.id
    try {
      const user = await User.findOne({_id})
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async login(req,res,next){
    try {
      let {email,password} = req.body
      const user = await User.findOne({email})
      if(user){
        if(user.OAuth){
          next({status: 401, message: 'you have been signed in using google, please sign in using Google'})
        }
        if(compareHash(password,user.password)){
          let payload = {
            id : user._id,
          }
          let token = getToken(payload)
          let name = user.username
          res.status(200).json({token,name})
        } else {
          next({status: 401, message: 'invalid username or password'})
        }
      } else {
        next({status: 401, message: 'invalid username or password'})
      }
    } catch (error) {
      next(error)
    }
  }

  static async loginOAuth(req,res,next){
    let { id_token } = req.body
    let payloadJWT
    try {
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID,
        });
      const payload = ticket.getPayload();
      const { email,name } = payload
      const emailFind = await User.findOne({email})
      if(emailFind){
        let id = emailFind._id
        payloadJWT = { id }
        let token = getToken(payloadJWT)
        res.status(200).json(token)
      } else {
        let username = name
        let password = process.env.OAUTH_PASSWORD
        const user = await User.create({username,email,password, OAuth: true})
        let id = user._id
        payloadJWT = { email,name,_id:id }
        let token = getToken(payloadJWT)
        res.status(200).json(token)
      }
    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserControllers