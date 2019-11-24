const jwt = require('jsonwebtoken')
const secret = process.env.secret

function generateToken (payload) {
    return jwt.sign( { payload },secret,{ expiresIn: 60*60 } )
}

function tokenVerify (token) {
    return jwt.verify(token, secret)
}

module.exports = {
    generateToken,
    tokenVerify
}