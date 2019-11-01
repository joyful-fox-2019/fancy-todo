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

async function authorizationCreator(req,res,next){
  try {
    // let userDetail = await User.findOne({_id : req.loggedUser.data.id})
    let userId = req.loggedUser.data.id
    let projectDetail = await Project.findOne({_id : req.params._id})
    console.log(typeof userId);
    console.log(typeof projectDetail.creator);
    if(projectDetail.creator == userId){
      next()
    } else {
      next({status: 403, message: 'You are not authorize to perform this action'})
    }
    // let projects = userDetail.projects
    // let {creator} = req.loggedUser.data
    // if (creator){
    //   next()
    // } else {
    // }
  } catch (error) {
    next(error)
  }
} 

async function authorization(req,res,next){
  try {
    let {id} = req.loggedUser.data
    let todoId = req.params._id
    let { projectId } = await User.findById({_id:id},'projectId')
    let { todos } = await Project.findById({_id:projectId},'todos')
    let check = false
    todos.forEach(element => {
      if (todoId == element){
        check = false
        next()
      } else {
        check = true
      }
    });
    if(check){
      next({status: 403, message: 'You are not authorize to perform this action'})
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {authentication,authorization,authorizationCreator}