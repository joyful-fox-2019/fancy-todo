const jwt = require('jsonwebtoken')

generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  generateToken,
  decodeToken
}