module.exports = function(err,req,res,next){
    let status
    let message

    switch (err.name) {
        case "ValidationError":
            status = 400
            let arr = []
            for( let i in err.errors){
                arr.push(err.errors[i].message)
            }
            message = arr
            break;
        
        case "JsonWebTokenError" :
            status = 401
            message = err.message
            break

        default:
            status = err.status || 500
            message = err.msg || err.message || "Internal Server Error"
            break;
    }

    res.status(status).json({code :status, message})
}