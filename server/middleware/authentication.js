const {verifyToken} = require('../helpers/tokenGenerator')

function authentication (req,res,next){
    try {
        let decodedToken = verifyToken(req.headers.token)
        // console.log(decodedToken)
        req.loggedUser = decodedToken
        next()
    } catch (err){
        res.status(500).json({message : 'you are not authenticated to perform this action'})
    }
}

module.exports = authentication