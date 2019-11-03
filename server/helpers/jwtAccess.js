const jwt = require('jsonwebtoken')

module.exports = {
    generate(dataUser){
            return jwt.sign(dataUser,process.env.SECRET)
        },
    verify(token){
            return jwt.verify(token , process.env.SECRET)
        }
}