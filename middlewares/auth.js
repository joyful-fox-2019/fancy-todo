const verifyToken = require('../helpers/tokenMaker').decodeToken
const User = require('../models/user')

function authentication(req, res, next) {
    try {
        let decodedToken = verifyToken(req.headers.token)
        User.findById(decodedToken.id)
            .then(user => {
                if(user) {
                    req.loggedUser = decodedToken
                } else {
                    next({ status: 401, message: "Authentication failed" })
                }
            })
            .catch(next)
    }
    catch(err) {
        next({ status: 401, message: err })
    }
}

// function authorization(req, res, next) {
//     let 
// }

module.exports = {
    authentication
}