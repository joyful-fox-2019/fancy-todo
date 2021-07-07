const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT

// function getToken(payload){
//   return jwt.sign({
//     data : payload
//   },secret,{expiresIn : '6h'})
// }

function getToken(payload){
  return jwt.sign({
    data : payload
  },secret)
}

function verifyToken(token){
  return jwt.verify(token,secret)
}

module.exports = {getToken,verifyToken}