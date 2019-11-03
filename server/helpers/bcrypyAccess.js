const bcrypt = require('bcrypt')

module.exports = {
    hash(password){
        const saltRound = 10
        return bcrypt.hashSync(password, saltRound)
    },
    verifyHash(password,hashPassword){
        return bcrypt.compareSync(password, hashPassword)
    }
}