const { decodeToken } = require('../helpers/jwt')
const User = require('../models/user')
const Todo = require('../models/todo')

module.exports = {
  authentication: function (req, res, next) {
    try {
      req.loggedUser = decodeToken(req.headers.token)
      User
        .findOne({
          _id: req.loggedUser._id
        })
        .then(result => {
          if (!result) {
            next({
              status: 401,
              message: 'Unauthorized'
            })
          } else {
            next()
          }
        })
        .catch(next)
    } catch (error) {
      next(error)
    }
  },
  todoAuthorization: function (req, res, next) {
    Todo
      .findById(req.params.id)
      .then(result => {
        if (result.UserId == req.loggedUser._id) {
          next()
        } else {
          next({
            status: 403,
            message: 'not authorized'
          })
        }
      })
      .catch(next)
  }
}