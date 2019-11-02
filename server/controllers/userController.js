const User = require('../models/User')
const {getToken} = require('../helpers/jwt')
const {compareHash} = require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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
          next({status: 401, message: 'email/password wrong'})
        }
      } else {
        next({status: 401, message: 'email/password wrong'})
      }
    } catch (error) {
      next(error)
    }
  }

  static async loginOAuth(req,res,next){
    try {
      let { id_token } = req.body
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: CLIENT_ID,
        });
    const payload = ticket.getPayload();
    } catch (error) {
      
    }
  }

}

module.exports = UserControllers