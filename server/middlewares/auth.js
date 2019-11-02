const { verifyToken } = require('../helpers/jwt')
const Todo = require('../models/Todo')

const authentication = (req, res, next) => {
  try {
    if (req.headers.access_token) {
      req.loggedUser = verifyToken(req.headers.access_token)
      next()
    } else {
      throw { status : 400, message : `session expired, you have to login`}
    }
  } catch (err) {
    next(err)
  }
}

const authorization = (req, res, next) => {
  let { id } = req.params
  console.log(req.params);
  
  Todo.findById(id)
  .then(todo => {
    if (!todo) {
      next({status : 404, message : `to-do not found`})
    } else if (todo.userId === req.loggedUser.id) {
      next()
    } else {
      next({ status : 401, message : `not authorized`})
    }
  })
}

module.exports = {
  authentication,
  authorization
}