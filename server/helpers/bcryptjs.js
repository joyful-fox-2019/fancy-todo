const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(10)

hashPassword = function(password){
    return bcrypt.hashSync(password,salt)
}

comparePassword = function(password,hashPassword){
    return bcrypt.compareSync(password,hashPassword)
}

module.exports = {hashPassword, comparePassword}

