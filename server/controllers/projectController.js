const Project = require('../models/Project')
const Todo = require('../models/Todo')
const User = require('../models/User')

class ProjectCont{

  static async findAll(req,res,next){
    try {
      const projects = await Project.find()
      res.status(200).json(projects)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req,res,next){
    try {
      let userId = req.loggedUser.data.id
      let {project} = await User.findById({_id : userId},'project')
      if (project){
        let findProject = await Project.findOne({_id:project}).populate('todos').populate('creator').populate('members')
        res.status(200).json(findProject)
      } else {
        next({status: 404, message: 'you are not involved in any project'})
      }
    } catch (error) {
      next(error)
    }
  }

  static async createProject(req,res,next){
    try {
      let {name,desc} = req.body
      let {id} = req.loggedUser.data
      const created = await Project.create({ name, creator : id, desc})
      const updateUser = await User.updateOne({ _id:id },{ project: created._id })
      res.status(201).json(updateUser)
    } catch (error) {
      next(error)
    }
  }

  static async addMember(req,res,next){
    try {
      let { emailMember } = req.body
      let projectId = req.params._id
      const member = await User.findOne({ email : emailMember })
      if (member){
        const updated = await Project.updateOne({_id:projectId},{$push:{members : member._id}})
        const updateUser = await User.updateOne({_id:member._id},{project : projectId})
        res.status(200).json({updated,updateUser})
      } else {
        next({status: 404, message: 'email not found'})
      }
    } catch (error) {
      next(error)
    }
  }

  static async addTodo(req,res,next){
    try {
      let { title,desc,dueDate } = req.body
      let projectId = req.params._id
      const todo = await Todo.create({ title, desc, dueDate })
      const updatedProject = await Project.updateOne({ _id:projectId },{ $push:{ todos : todo._id }})
      res.status(201).json({todo,updatedProject})
    } catch (error) {
      next(error)
    }
  }


}
module.exports = ProjectCont
