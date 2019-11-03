const Todo = require('../models/todo')
const User = require('../models/user')

class TodoController {
  static listTodo(req,res,next){
    const {_id} = req.loggedUser
    Todo.find({UserId:_id})
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          res.status(200).json([])
        }
      })
      .catch(next)
  }

  static findTodo(req,res,next){
    const {_id} = req.params
    console.log(req.params)
    Todo.findOne({_id})
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          res.status(200).json([])
        }
      })
      .catch(next)
  }

  static createTodo(req,res,next){
    const {_id} = req.loggedUser
    const {title,description,dueDate} = req.body
    Todo.create({UserId:_id,title,description,dueDate})
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static updateTodo(req,res,next){
    const {_id} = req.params
    const {title,description,dueDate} = req.body
    Todo.updateOne({_id},{title,description, dueDate})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static removeTodo(req,res,next){
    const {_id} = req.params
    Todo.deleteOne({_id})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = TodoController