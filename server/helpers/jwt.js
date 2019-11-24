const jwt = require('jsonwebtoken')

function sign(obj){
  return jwt.sign(obj, process.env.JWT_SECRET)
}

function verify(token){
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  sign,
  verify
}