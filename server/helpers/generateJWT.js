const jwt = require('jsonwebtoken');

module.exports = function(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}