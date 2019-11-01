const User = require('../models/User')
const {sign, verify} = require('../helpers/jwt')

function authentication(req, res, next){
  try{
    const token = req.headers.access_token
    const userLogin = verify(token)
    User.findOne({email: userLogin.email})
      .then(user=>{
        if(user){
          req.loggedUser = userLogin
          next()
        }
        else{
          throw {msg: 'login needed'}
        }
      })
  }
  catch{
    res.status(401).json({
      msg: 'login needed'
    })
  }
}

function authorization(req, res, next){
  const todoId = req.params.id
}

module.exports = authentication