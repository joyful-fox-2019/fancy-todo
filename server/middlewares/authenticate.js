const jwtHelper = require('../helpers/jwtHelper');

module.exports = (req,res,next)=>{
    if(!req.headers.ft_token){
        res.status(401).json({msg: `Authentication failed`});
    }
    else{
        req.userid = jwtHelper.verify(req.headers.ft_token);
        next();
    }
}