const { decodeToken } = require('../helpers/jwt')
const User = require('../models/User')
const Task = require('../models/Task')

authentication = (req, res, next) => {
  try {
    if(!req.headers.access_token) {
      throw {status: 401, msg: 'You have to login first'}
    } else {
      const { id } = decodeToken(req.headers.access_token)
      User.findById(id)
      .then(user => {
        if(!user) {
          throw {status: 401, msg: 'You have to login first'}
        } else {
          req.loggedUser = user
          next()
        }
      })
      .catch(next)
    }
  } catch (err) {
    next(err)
  }
}

authorization = (req, res, next) => {
  Task.findById(req.params.id)
  .then(task => {
    if(!task) {
      throw { status: 404, msg: 'Task data not found'}
    } else {
      if(String(task.user) !== String(req.loggedUser._id)) {
        throw { status: 401, msg: 'You are not authorized to access this data'}
      } else {
        req.task = task
        next()
      }
    }
  })
  .catch(next)
}

module.exports = {
  authentication,
  authorization
}