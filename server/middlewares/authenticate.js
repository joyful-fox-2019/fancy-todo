const JWT = require('../helpers/JWT')
const User = require('../models/user')

module.exports = (req, res, next) => {
  let access_token

  if (req.body.access_token) {
    access_token = req.body.access_token
  }
  else {
    access_token = req.headers.access_token
  }
  const decoded = JWT.verifyToken(access_token)

  console.log("JWT: ini access_token", access_token);
  console.log("JWT: ini decoded", decoded);

  if (!access_token || !decoded) {
    throw {
      name: 'Unauthorized',
      status: 401,
      message: 'Unauthorized access!'
    }
  }
  else {
    User
      .findOne({ email: decoded.payload })
      .then(user => {
        if (!user) {
          throw {
            name: 'Unauthorized',
            status: 401,
            message: 'Unauthorized access!'
          }
        }
        else {
          req.user = {
            id: user._id,
            email: user.email
          }
          next()
        }
      })
      .catch(next)
  }
}