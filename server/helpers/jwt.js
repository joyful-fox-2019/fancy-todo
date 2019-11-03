const jwt = require("jsonwebtoken")

const generateToken = function(payload){
    return jwt.sign(payload,process.env.SALT)
}

const verifyToken = function(token){
    return jwt.verify(token,process.env.SALT)
}

module.exports = {generateToken, verifyToken}