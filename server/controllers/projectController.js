const { Project, User } = require('../models')
const { ObjectId } = require('mongoose').Types

class ProjectController {

  static find (req, res, next) {
    const {id} = req.loggedUser
    let objParams = { $or : [{ owner: id }, { members:  id}]}
    Project.find(objParams).populate('owner').populate('todos').populate('members')
      .then(projects => {
        res.status(200).json(projects)
      })
      .catch(next)
  }
  static create (req, res, next) {
    const {id } = req.loggedUser
    const {name} = req.body
    Project.create({name, owner: id, members: id})
      .then(project => {
        res.status(201).json(project)
      })
      .catch(next)
  }
  static findById (req, res, next) {
    const {id} = req.params
    Project.findById(id).populate('owner').populate('members').populate('todos  ')
      .then(project=>{
        res.status(200).json(project)
      })
      .catch(next)
  }
  static update (req, res, next) {
    const {command, email, member, todo, name} = req.body
    let objParams = {}
    if(email) {
      User.findOne({ email })
      .then(user => {
        if(!user) { next({message: 'Not found', status: 404}) }
        else {
          let member
          member = user._id
          let objParams = {}
          if(command === 'addMember') objParams.$push = {members: member}
          return Project.updateOne({ _id: id}, objParams, {omitUndefined: true})
          .then(()=> {
            res.status(200).json({message: 'Successfully update project'})
          })
        }
      })
      .catch(next)
    }
    
    if(name) objParams.name = name
    if(command === 'removeMember') objParams.$pull = {members: member}
    if(command === 'addTodo') objParams.$push = {todos: todo}
    if(command === 'removeTodo') objParams.$pull = {todos: todo}
    const { id } = req.params
    Project.updateOne({_id: id}, objParams, {omitUndefined: true})
      .then(()=>{
        res.status(200).json({message: 'Successfully update project'})
      })
      .catch(next)
  }
  static remove (req, res, next) {
    const {id} = req.params
    Project.deleteOne({_id: id})
      .then(()=> {
        res.status(200).json({message: 'Successfully deleted project'})
      })
      .catch(next)
  }
}

module.exports = ProjectController
