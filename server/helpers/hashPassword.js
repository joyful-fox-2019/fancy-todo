const bcrypt = require ("bcryptjs")

function hashPassword (password){
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password,salt)
}

function verifyPassword(password,hashedPassword){
    return bcrypt.hashSync(password,hashedPassword)
}

module.exports = {
    hashPassword,
    verifyPassword
}

