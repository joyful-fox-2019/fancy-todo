const User = require('../models/user')
const {decodeHash} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
  static login(req,res,next){
    const {email,password} = req.body
    console.log(email,password)
    User.findOne({email})
      .then(data => {
        if(data && decodeHash(password, data.password)){
          let payload = {name: data.name, email: data.email, _id:data._id}
          let token = generateToken(payload)
          res.status(200).json({"access_token":token, name:data.name, _id:data._id})
        }
        else{
          throw {message:"Invalid password or email", status:400}
        }
      })
      .catch(next)
  }

  static loginGoogle(req,res,next){
    const { email,name } = req.googleData
    console.log(email,name)
    const password = '123456'
    User.findOne({email})
      .then(data => {
        if(data){
          let payload = {name: data.name, email: data.email, _id:data._id}
          let token = generateToken(payload)
          return res.status(200).json({"access_token":token, name:data.name, _id:data._id})
        }
        else{
          return User.create({email,name,password})
        }
      })
      .then(data => {
        let payload = {name: data.name, email: data.email, _id:data._id}
        let token = generateToken(payload)
        return res.status(200).json({"access_token":token, name:data.name, _id:data._id})
      })
      .catch(next)
  }

  static register(req,res,next){
    const {name,email,password} = req.body
    User.create({name,email,password})
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }
}

module.exports = UserController