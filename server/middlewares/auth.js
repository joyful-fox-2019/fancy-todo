const { tokenVerify } = require('../helpers/jwt')

function Authentification(req, res, next) {
    
    try {
        const decoded = tokenVerify(req.headers.token)
        req.decoded = decoded;
        console.log(req.decoded, 'sini')
        next();
    } catch (err) {
        res.status(403).json({ msg: 'You must Login as user first' })
    }
};


module.exports = Authentification