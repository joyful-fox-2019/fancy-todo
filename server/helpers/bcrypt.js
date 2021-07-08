const bcrypt = require('bcryptjs');

function generatePassword(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

function verifyPassword(password, passwordDB) {
    return bcrypt.compareSync(password, passwordDB);
}

module.exports = {generatePassword, verifyPassword};