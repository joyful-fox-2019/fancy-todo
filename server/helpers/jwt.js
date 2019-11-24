const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload,process.env.SALT)
}

function verifyToken(token) {
    return jwt.verify(token,process.env.SALT)
}

module.exports = {generateToken,verifyToken}