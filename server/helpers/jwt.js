const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload,process.env.SALT)
}

function VerifyToken(token) {
    return jwt.verify(token,process.env.SALT)
}

module.exports = {generateToken,VerifyToken}