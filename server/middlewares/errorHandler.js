module.exports = {
    errorHandler(err, re, res, next) {
        console.log(err.name)
        switch (err.name) {
            case 'ValidationError': {
                // let message = err.errors.map(error => {
                let message = []
                for (let key in err.errors) {
                    message.push(err.errors[key].message)
                }
                res.status(400).json({ message })
            }
                break;
            case 'CastError': {
                let Errors = 'id not found'
                res.status(400).json({ Errors })
            }
                break;

            default:
                let status = err.status || 500
                let message = err.message || 'Oops!! Sorry! Server is under attack!'
                res.status(status).json({ message })
        }
    }
}