const jwt = require('jsonwebtoken')

module.exports = {
    getToken: function (id) {
        return jwt.sign({
            id
        }, process.env.JWT_SECRET)
    },
    verifyToken: function (token) {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}