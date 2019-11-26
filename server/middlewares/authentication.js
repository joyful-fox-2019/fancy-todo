const {verifyToken} = require ('../helpers/jwt') 

const authentication = (req, res , next) => {
  try {
    const decode = verifyToken(req.headers.accesstoken)
    req.user = decode
    next()
  }
  catch (err){
    next(err)
  }
}

module.exports = authentication