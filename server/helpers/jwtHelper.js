const jwt = require('jsonwebtoken');

function generate (payload){
    return jwt.sign(payload, process.env.JWT_SECRET);
}

function verify (token){
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports={generate, verify}