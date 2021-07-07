const Todo = require('../models/Todo')
const Project = require('../models/Project')
const User = require('../models/User')

class TodoCont{

  static async findAll(req,res,next){
    try {
      let userId = req.loggedUser.data.id
      const { todos } = await User.findOne({_id:userId},'todos').populate('todos')
      res.status(200).json(todos)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req,res,next){
    try {
      let { _id } = req.params
      const todo = await Todo.findOne({_id})
      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }

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
      const updatedUser = await User.updateOne({_id : userId},{$pull:{ todos : _id}})
      const deleteTodo = await Todo.deleteOne({_id})
      res.status(200).json({updatedUser,deleteTodo})
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
