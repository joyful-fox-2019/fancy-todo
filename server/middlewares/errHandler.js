let validationExtractor = require('../helpers/validationExtractor')
module.exports = (err, req, res, next) =>{
    let status = err.status || 500
    let message = err.message || "internal server error"
    
    if(err.name === "ValidationError"){
        message = validationExtractor(err)
        status = 400
    }else if(err.name === "TokenExpiredError" ||  err.name === "JsonWebTokenError"){
        status = 401
        message = "You need to login first"
    }
    res.status(status).json({message})
}