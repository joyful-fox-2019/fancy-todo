const {decodeToken} = require('../helpers/jwt')
const Todo = require('../models/todo')
const Project = require('../models/project')

function authentication(req,res,next){
  const {authorization} = req.headers
  if(authorization){
    req.loggedUser = decodeToken(authorization)
    // console.log(req.loggedUser)
    return next()
  }
  else{
    res.status(401).json({message:"Invalid Authentication"})
  }
}

function authorizationForTheirTodo(req,res,next){
  const UserId = req.loggedUser._id
  const {_id} = req.params // Todo ID
  Todo.findOne({_id})
    .then(data => {
      if(data){
        if(data.UserId == UserId){
          return next()
        }
        else{
          res.status(401).json({message:"Invalid Authorization"})
        }
      }
      else{
        res.status(404).json({message:"Data Not Found"})
      }
    })
    .catch(next)
}

function authorizationForProject(req,res,next){
  const UserId = req.loggedUser._id
  const {_id} = req.params // Project ID
  Project.findOne({_id})
  .then(data => {
    console.log(data,"datamasuk")
      if(data){
        for(let i = 0; i < data.UserId.length; i++){
          if(UserId == data.UserId[i]){
            return next()
          }
        }
        res.status(401).json({message:"Invalid Authorization"})
      }
      else{
        res.status(404).json({message:"Data Not Found"})
      }
    })
    .catch(next)
}

function authorizationForProjectOwner (req,res,next){
  const UserId = req.loggedUser._id
  const {_id} = req.params // Project ID
  Project.findOne({_id})
    .then(data => {
      if(data){
        if(data.OwnerId == UserId){
          return next()
        }
        else{
          res.status(401).json({message:"Invalid Authorization"})
        }
      }
      else{
        res.status(404).json({message:"Data Not Found"})
      }
    })
    .catch(next)
}


module.exports = {
  authentication,
  authorizationForTheirTodo,
  authorizationForProject,
  authorizationForProjectOwner
}
