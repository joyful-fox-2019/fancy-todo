const jwt = require('jsonwebtoken')

function generateToken(payLoad){
  return jwt.sign(payLoad, process.env.SALT, { expiresIn: 60 * 60 })
}

function verifyedToken(token){
  return jwt.verify(token, process.env.SALT)
}

module.exports = {
  generateToken,
  verifyedToken
}