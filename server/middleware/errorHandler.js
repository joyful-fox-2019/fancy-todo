module.exports = (err, req, res, next) => {
    console.log(err);
    let status = err.status
    let message = err.msg

    if (err.status === undefined)
        switch (err.name) {
            case 'ValidationError':
                status = 400
                let arr = []
                for (const key in err.errors) { arr.push(err.errors[key].message) }
                message = arr
                break;
            case 'AuthorizationError':
                status = 403
                message = err.message
                break;
            case 'JsonWebTokenError':
                status = 401
                message = "You are not logged in."
                break;
            case 'NotFound':
                status = 404
                message = err || err.msg
                break;
            default:
                status = err.status || 500
                message = err.message || err.msg || 'Internal Server Error'
                break;
        }
    res.status(status).json(message)
}
