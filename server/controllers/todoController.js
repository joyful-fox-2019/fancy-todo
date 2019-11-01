const Todo = require('../models/Todo')
const Project = require('../models/Project')
const User = require('../models/User')

class TodoCont{

  static async findAll(req,res,next){
    try {
      const todos = await Todo.find()
      res.status(200).json(todos)
    } catch (error) {
      next(error)
    }
  }

  // static async add(req,res,next){
  //   try {
  //     let { id } = req.loggedUser.data
  //     let { title,desc,dueDate } = req.body
  //     // const { projectId }= await User.findOne({_id:id},'projectId')
  //     const created = await Todo.create({
  //       title,
  //       desc,
  //       dueDate
  //     })
  //     const updateUserId = await Todo.updateOne({_id:created.id},{$push:{userId : id}})
  //     const updateTodoId = await Project.updateOne({_id:projectId},{$push:{todos : created._id}})
  //     res.status(201).json({updateUserId,updateTodoId})
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async add(req,res,next){
    try {
      let { id } = req.loggedUser.data
      let { title,desc,dueDate } = req.body
      const created = await Todo.create({
        title,
        desc,
        dueDate
      })
      const updateUser = await User.updateOne({ _id:id },{ $push: { todos : created._id }})
      res.status(201).json({created,updateUser})
    } catch (error) {
      next(error)
    }
  }

  static async remove(req,res,next){
    try {
      let { _id } = req.params
      let userId = req.loggedUser.data.id
      let { projectId } = await User.findById({_id:userId},'projectId')
      const updateProject = await Project.updateOne({_id:projectId},{$pull:{todos : _id}})
      const deleteTodo = await Todo.deleteOne({_id})
      res.status(200).json({updateProject,deleteTodo})
    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      let {_id} = req.params
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



}
module.exports = TodoCont
