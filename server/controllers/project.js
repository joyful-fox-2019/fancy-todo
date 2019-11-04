const Project = require('../models/project')
const Todo = require('../models/todo')
const User = require('../models/user')

class ProjectControllers {

  static findUser(req, res, next){
    User.find()
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findAll(req, res, next){
    const { id } = req.user
    Project.find({ $or:[ {'owner':id}, {'members':id} ] })
    // Project.find({ members: id })
      .populate([ 'members', 'todos', 'owner'])
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findOne (req, res, next){
    const { id } = req.params
    Project.findById(id)
      .populate([ 'members', 'todos', 'owner'])
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static create(req, res, next){
    const { title, members } = req.body
    console.log(title, members)
    const owner = req.user.id
    console.log(owner)
    Project.create({ title, members, owner })
      .then( result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static delete(req, res, next){
    const projectId  = req.params.projectid
    Project.findByIdAndRemove(projectId)
      .then( data => {
        return Todo.deleteMany({ projectId })
      })
      .then( result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static addMember(req, res, next){
    const { id } = req.params
    Project.findByIdAndUpdate(id, { $addToSet: { members: req.body.userId }})
      .then( result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ProjectControllers