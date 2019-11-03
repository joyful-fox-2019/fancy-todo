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
      console.log(userId);
      let {project} = await User.findById({_id : userId},'project')
      console.log(project)
      if (project){
        let findProject = await Project.findOne({_id:project}).populate('todos').populate('creator').populate('members')
        res.status(200).json(findProject)
      } else {
        next({status: 404, message: 'you are not involved in any project'})
      }
    } catch (error) {
      console.log(error)
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
      const todo = await Todo.create({ title, desc, dueDate, projectId })
      const updatedProject = await Project.updateOne({ _id:projectId },{ $push:{ todos : todo._id }})
      res.status(201).json({todo,updatedProject})
    } catch (error) {
      next(error)
    }
  }
  static async updateTodo(req,res,next){
    try {
      let _id = req.params.todoid
      let arr = ['title','desc','status']
      let fields = req.body
      let obj = {}
      arr.forEach((el)=>{
        for(let key in fields){
          if (el === key){
            obj[el] = fields[key]
          }
        }
      })
      const updated = await Todo.updateOne({_id},obj)
      res.status(200).json(updated)
    } catch (error){
      next(error)
    }
  }

  static async removeTodo(req,res,next){
    try {
      let _id = req.params.todoid
      let projectId = req.params._id
      const updatedProject = await Project.updateOne({_id : projectId},{$pull:{ todos : _id}})
      const deleteTodo = await Todo.deleteOne({_id})
      res.status(200).json({updatedProject,deleteTodo})
    } catch (error) {
      next(error)
    }
  }

}
module.exports = ProjectCont
