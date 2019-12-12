module.exports = (err, req, res, next) => {
    if (err === 'EF') {
        res.status(404).json({
            message: 'Please input required field'
        })
    } else if (err.status && err.status === '401') {
        res.status(401).json({
            message: 'Sorry,you don\'t have permission to access this site'
        })
    } else if (err === '404') {
        res.status(404).json({
            message: 'Couldn\'t find data'
        })
    } else if (err === '400') {
        res.status(400).json({
            message: 'Bad request occurred'
        })
    } else if (err.name === 'ValidationError') {
        let key = Object.keys(err.errors)
        if (Object.entries(err.errors).length > 1) {
            res.status(400).json({
                password: err.errors.password.message,
                email: err.errors.email.message
            })
        }
        res.status(400).json({
            message: err.errors[key].message
        })
    } else if (err.status && err.status === '403') {
        res.status(403).json({
            message: err.message
        })
    } else {
        res.status(500).json({
            message: err
        })
    }
}