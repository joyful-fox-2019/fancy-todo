const bcrypt = require('bcryptjs')

let salt = Number(process.env.SALT)

function hashPassword (payload) {
    return bcrypt.hashSync(payload, salt)
}

function compare (payload, hashedPassword) {
    return bcrypt.compareSync(payload, hashedPassword)
}

module.exports = {
    hashPassword,
    compare
}