const {
    verifyToken
} = require('../helpers/jwtoken')

module.exports = (req, res, next) => {
    try {
        req.decoded = verifyToken(req.headers.token)
        next()
    } catch (err) {
        throw {
            status: '403',
            message: 'You don\'t have permission for this server'
        }
    }
}