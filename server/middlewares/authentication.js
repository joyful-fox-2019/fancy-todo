const { verify } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    try {
        let decoded = verify(req.headers.token)
        req.loggedUser = decoded
        next()
    } catch (err) {
        next(err)
    }
}