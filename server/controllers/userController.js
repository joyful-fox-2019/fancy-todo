const User = require('../models/User')
const {hash, compare} = require('../helpers/bcrypt')
const {sign, verify} = require('../helpers/jwt')

class UserController {
  static register(req, res, next){
    const {name, email, password} = req.body
    const hashPassword = hash(password)
    User.create({
      name,
      password: hashPassword,
      email
    })
      .then(user=>{
        res.status(201).json(user)
      })
      .catch(next)
  }

  static login(req, res, next){
    const {email, password} = req.body
    User.findOne({email})
      .then(user=>{
        if(user && compare(password, user.password)){
          const token = sign({
            _id: user._id,
            email
          })

          res.status(200).json({
            token,
            name: user.name
          })
        }
        else{
          throw{
            msg: 'password/email wrong'
          }
        }
      })
      .catch(next)
  }
}

module.exports = UserController