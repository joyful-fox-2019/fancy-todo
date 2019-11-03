const User = require('../models/user')
const jwt = require('../helpers/jwt')

module.exports = (req, res, next) => {
  try {
    let verified = jwt.verify(req.headers.access_token)
    req.user = verified
    User.findOne({ _id: req.user.id })
      .then(result => {
        if (result) {
          next()
        } else {
          let err = new Error('User is not found')
          next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  } catch (err) {
    err.name = 'jsonwebtoken'
    next(err)
  }
}