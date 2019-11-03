const bcrypt = require('bcryptjs')
const saltRounds = 10

function hashPassword(password){
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function compare(password, hashedPassword){
    let valid = bcrypt.compareSync(password, hashedPassword);
    if(valid){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    hashPassword, compare
}