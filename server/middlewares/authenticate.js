const jwt = require('../helpers/jwtHandler')


function authenticate(req,res,next){
    try{
        const decoded = jwt.verifyToken(req.headers.token , process.env.JWT_SECRET);
        req.decoded = decoded
        next()
    }catch (err){
        console.log('error authentikasi',err)
        next(err)
    }
}

module.exports = authenticate;