const Project = require('../models/project')
const Todo = require('../models/todo')
const User = require('../models/user')

class ProjectController {
  static findProject(req,res,next){
    const {_id} = req.params // ProjectId
    Project.findOne({_id})
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          throw {message:"Project not found", status: 404}
        }
      })
      .catch(next)
  }

  static projectList(req,res,next){
    const UserId = req.loggedUser._id
    Project.find({UserId})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static createProject(req,res,next){
    const OwnerId = req.loggedUser._id
    const {projectName} = req.body
    let dataProject
    Project.create({OwnerId, projectName, UserId:OwnerId})
      .then(data => {
        dataProject = data
        res.status(201).json(dataProject)
      })
      .catch(next)
  }

  static deleteProject(req,res,next){
    const {_id} = req.params // ProjectId
    Project.deleteOne({_id})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static listTodo(req,res,next){
    const {_id} = req.params // ProjectId
    Project.findOne({_id})
    .populate('TodoId')
    .then(data => {
      if(data){
        res.status(200).json({data:data.TodoId, projectName:data.projectName})
      }
      else{
        throw {message:"Data not found", status:404}
      }
    })
    .catch(next)
  }

  static addTodo(req,res,next){
    const {title, description, dueDate} = req.body
    const {_id} = req.params // ProjectId
    let todoData
    Todo.create({title,description,ProjectId:_id,dueDate})
      .then(data => {
        todoData = data
        return Project.updateOne({_id},{$push:{TodoId:data._id}})
      })
      .then(data => {
        res.status(201).json(todoData)
      })
      .catch(next)
  }

  static removeTodo(req,res,next){
    const {_id, TodoId} = req.params // ProjectId, TodoId
    Todo.deleteOne({_id:TodoId})
      .then(data => {
        return Project.updateOne({_id},{$pull:{TodoId}})
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static listUser(req,res,next){
    const {_id} = req.params // ProjectId
    Project.findOne({_id})
      .populate('UserId')
      .populate('OwnerId')
      .then(data => {
        console.log(data)
        res.status(200).json({user:data.UserId,owner:data.OwnerId})
      })
      .catch(next)
  }

  static addUser(req,res,next){
    const {email} = req.body
    const {_id} = req.params // ProjectId
    User.findOne({email})
      .then(data => {
        if(data){
          Promise.all([
            // User.updateOne({_id:data._id}, {$addToSet:{ProjectId:_id}}),
            Project.updateOne({_id}, {$addToSet:{UserId:data._id}})
          ])
        }
        else{
          throw {message:"User not found", status: 404}
        }
      })
      .then(data => {
        res.status(200).json({message:"user successfully added"})
      })
      .catch(next)
  }

  static removeUser(req,res,next){
    const {_id, UserId} = req.params // ProjectId & UserId
    Promise.all([
      // User.updateOne({_id:UserId}, {$pull:{ProjectId:_id}}),
      Project.updateOne({_id},{$pull:{UserId}})
    ])
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
  }
  
}

module.exports = ProjectController