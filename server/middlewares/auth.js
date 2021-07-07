const { verifyToken } = require('./jwt')
const User = require('../models/user')
const Todo = require('../models/todo')

function authentication (req, res, next){
    console.log('masuk authentication')
  try {
    console.log('masuk try')
    let decodedToken = verifyToken(req.headers.token)
    console.log(decodedToken)
    User.findById(decodedToken.id)
      .then(user => {
        if(user){
          req.loggedUser = decodedToken
          console.log('log' + req.loggedUser.id)
          next()
        }
        else{
          next({ status: 401, message: 'Authentication Failed' })
        }
      })
      .catch(next)
  }
  catch(err) {
    next({ status: 401, message: err })
  }
}

function authorization (req, res, next){
    console.log('masuk authorization')
    console.log(req.loggedUser.id)
  let { id } = req.params //id todo
  Todo.findById(id)
    .then(todo => {
        console.log('ini todo.UserId')
        console.log(todo.UserId)
      if(!todo){
        next({ status: 404, message: 'Not Found' })
      }
      else if(todo.UserId == req.loggedUser.id){
        console.log('succes authorisasi')
        next()
      }
      else{
        next({ status: 403, message: 'Not Authorize' })
      }
    })
    .catch(err => {
      next({ status: 403, message: err })
    })
}

module.exports = { authentication, authorization }