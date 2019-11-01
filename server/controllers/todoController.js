const Todo = require('../models/Todo')

class TodoController{
  static getTodos(req, res, next){
    const user = req.loggedUser
    Todo.find({
      user_id: user._id
    })
      .then(todos=>{
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static crateTodo(req, res, next){
    const user = req.loggedUser
    const {title, description} = req.body
    Todo.create({
      title,
      description,
      user_id: user._id
    })
      .then(todo=>{
        res.status(201).json(todo)
      })
      .catch(next)
  }
}

module.exports = TodoController