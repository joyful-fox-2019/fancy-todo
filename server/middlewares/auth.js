const {verifyToken} = require('../helpers/jwt')
const User = require('../models/User')
const Project = require('../models/Project')

function authentication(req,res,next){
  try {
    let {token} = req.headers
    let decoded = verifyToken(token)
    req.loggedUser = decoded
    next()
  } catch (error) {
    next(error)
  }
}

async function authorization(req,res,next){
  try {
    let {id} = req.loggedUser.data
    let todoId = req.params._id
    let userTodo = await User.findOne({_id:id},'todos')
    const todo = userTodo.todos.find(function(el){
      return el == todoId
    })
      if (todo){
        next()
      } else {
        next({status: 403, message: 'You are not authorize to perform this action'})
      }
  } catch (error) {
    next(error)
  }
}

async function authorizationCreator(req,res,next){
  try {
    let userId = req.loggedUser.data.id
    let projectDetail = await Project.findOne({_id : req.params._id})
    if(projectDetail.creator == userId){
      next()
    } else {
      next({status: 403, message: 'You are not authorize to perform this action'})
    }
  } catch (error) {
    next(error)
  }
} 

async function authorizationCRUD(req,res,next){
  try {
    let projectId = req.params._id
    let userId = req.loggedUser.data.id
    const user = await User.findOne({_id : userId})
    if (projectId == user.project){
      next()
    } else {
      next({status: 403, message: 'You are not authorize to perform this action'})
    }
  } catch (error) {
    next(error)
  }
}



module.exports = {authentication,authorization,authorizationCreator,authorizationCRUD}