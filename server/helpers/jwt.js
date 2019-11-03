const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken(payload){
  return jwt.sign(payload,process.env.JWTSECRET)
}

function decodeToken(token){
  return jwt.verify(token, process.env.JWTSECRET)
}

module.exports = {
  generateToken,
  decodeToken
}