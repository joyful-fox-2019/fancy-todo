const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.headers.token) {
        try {
            let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
            next();
        }
        catch(error) {
            res.status(400).json({
                message: `Invalid JWT Token`
            })
        }
    } else {
        res.status(400).json({
            message: 'Please Login First'
        })
    }
}