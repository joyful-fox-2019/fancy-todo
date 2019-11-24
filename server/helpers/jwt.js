const jwt = require('jsonwebtoken')

module.exports = {
  generate: (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
  },
  verify: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}