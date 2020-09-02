const jwt = require('jsonwebtoken')

function generateToken(payload) {
  return jwt.sign({ payload }, process.env.JWT_SECRET)
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
  catch (err) {
    console.log(err)
  }
}

module.exports = { generateToken, verifyToken }