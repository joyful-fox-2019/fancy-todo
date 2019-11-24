const bcr = require('bcryptjs')

function hash (pass) {
    let salt = bcr.genSaltSync(10)
    return bcr.hashSync(pass, salt)
}

function check (pass, hashPass) {
    return bcr.compareSync(pass,hashPass)
}

module.exports = {
    hash,
    check
}