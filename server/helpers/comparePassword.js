`use strict`
var bcrypt = require('bcryptjs');

module.exports = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash); 
}