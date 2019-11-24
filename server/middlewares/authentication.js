const User = require('../models/User')
const Todo = require('../models/Todo')
const Project = require('../models/Project')
const {sign, verify} = require('../helpers/jwt')

function authentication(req, res, next){
  try{
    const token = req.headers.access_token
    const userLogin = verify(token)
    User.findOne({email: userLogin.email})
      .then(user=>{
        if(user){
          req.loggedUser = userLogin
          next()
        }
        else{
          throw {
            errors: {
              status: 401,
              msg: 'login needed'
            }}
        }
      })
  }
  catch{
    res.status(401).json({
      msg: 'login needed'
    })
  }
}

function todoAuthorization(req, res, next){
  const _id = req.params.id
  const user = req.loggedUser
  Todo.findOne({_id})
    .then(todo=>{
      if(todo.user_id == user._id){
        next()
      }
      else{
        throw {
          errors: {
            status: 403,
            msg: 'not authorized'
          }
        }
      }
    })
    .catch(next)
}

function projectAuthentication(req, res, next){
  const _id = req.params.project
  const loggedUser = req.loggedUser
  Project.findOne({_id})
    .then(project=>{
      let isAuthorized = false
      project.users_id.forEach(user=>{
        if(user == loggedUser._id){
          isAuthorized = true
        }
      })
      if(isAuthorized){
        next()
      }
      else{
        throw {
          errors: {
            status: 403,
            msg: 'not authorized'
          }
        }
      }
    })
    .catch(next)
}

module.exports = {
  authentication,
  todoAuthorization,
  projectAuthentication
}