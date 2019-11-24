const bcrypt = require('bcryptjs')

module.exports = {
    hash(inputPass){
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(inputPass, salt)
    },

    compare(inputPass, hash){
        return bcrypt.compareSync(inputPass, hash)
    }
}