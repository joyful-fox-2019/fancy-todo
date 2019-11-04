const Project = require('../models/project')
const User = require('../models/user')
const Todo = require('../models/todo')

class ProjectController {
  static findAll(req, res, next){
    Project.find()
      .then(projects => {
        let arr = []
        projects.forEach(project => {
          if(project.owner == req.loggedUser._id){
            arr.push(project)
          }
          else{
            project.members.forEach(member => {
              if(member == req.loggedUser._id){
                arr.push(project)
              }
            })
          }
        })
        res.status(200).json(arr)
      })
      .catch(next)
  }
  static findOne(req, res, next){
    Project.findById(req.params.id)
      .populate('todoId')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
  static create(req, res, next){
    let {name} = req.body
    Project.create({
      name,
      owner: req.loggedUser._id
    })
      .then(data => {
          res.status(201).json(data)
      })
      .catch(next)
  }
  static addMember(req, res, next){
    let {id} = req.params
    let {email} = req.body
    User.findOne({email})
      .then(member => {
        if (member){
          return Project.findByIdAndUpdate({_id:id}, {$push : {members: member._id}}, {new: true})
        }
        else{
          next({status: 404, message:"Email not Found"})
        }
      })
      .then(newMember => {
        res.status(201).json(newMember)
      })
      .catch(next)
  }
  static removeMember(req, res, next){
    let {id} = req.params
    let {email} = req.body
    User.findOne({email})
      .then(member => {
        if (member){
          return Project.findByIdAndUpdate({_id:id}, {$pull: { "members": member._id }}, {safe: true, multi:true})
        }
        else{
          next({status: 404, message:"Email not Found"})
        }
      })
      .then(newMember => {
        res.status(200).json(newMember)
      })
      .catch(next)
  }
  static deleteProject(req, res, next){
    let {id} = req.params
    Project.findByIdAndDelete({_id:id})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static addTodo(req, res, next){
    let {id} = req.params
    let {title, description, duedate} = req.body
    Todo.create({
        title,
        description,
        duedate,
        userId: req.loggedUser._id
    })
      .then(data => {
        return Project.findByIdAndUpdate({_id:id}, {$push : {todoId: data._id}}, {new: true})
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static updateTodos (req, res, next){
    let {title, description, duedate} = req.body
    if(new Date(duedate) < new Date()){
      next({
        status: 400,
        message: 'Due Date has Passed'
      })
    }
    else{
      Todo.findByIdAndUpdate({_id:req.params.todoId},
        {
          title,
          description,
          duedate
        }
      )
        .then(data => {
          res.status(200).json(data)
        })
        .catch(next)
    }
  }
  static updateStatus (req, res, next){
    Todo.findById(req.params.todoId)
      .then(data => {
        return Todo.findByIdAndUpdate(
          {
            _id: req.params.todoId
          },
          {
            status: !data.status
          }
        )
      })
      .then(data => {
          res.status(200).json(data)
      })
      .catch(next)
  }
  static deleteTodos (req, res, next){
    Todo.findByIdAndDelete({_id:req.params.todoId})
      .then(data => {
          res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = ProjectController