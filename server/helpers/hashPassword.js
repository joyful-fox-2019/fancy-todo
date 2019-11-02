const bcrypt = require("bcrypt");
const saltRounds = 10;

function hash (password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

function compare (password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hash: hash,
    compare: compare
};