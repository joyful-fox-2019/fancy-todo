const {verifyToken} = require('../helpers/tokenGenerator')

function authentication (req,res,next){
    try {
    
        let decodedToken = verifyToken(req.headers.token)
        req.loggedUser = decodedToken
        next()
    } catch (err){
        next({status : 401, message: "you are not authenticated to perform this action"})
    }
}

module.exports = authentication