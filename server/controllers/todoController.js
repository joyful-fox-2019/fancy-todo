const Todo = require('../models/Todo')
const User = require('../models/User')
const Project = require('../models/Project')

class TodoController{
  static getTodos(req, res, next){
    const user = req.loggedUser
    Todo.find({
      user_id: user._id
    })
    .populate('user_id')
    .sort({createdAt: 'desc'})
      .then(todos=>{
        let arrTodo = []
        todos.forEach(todo=>{
          if(!todo.project_id){
            arrTodo.push(todo)
          }
        })
        res.status(200).json(arrTodo)
      })
      .catch(next)
  }

  static crateTodo(req, res, next){
    const user = req.loggedUser
    const {title, description} = req.body
    let globalTodo = ''
    Todo.create({
      title,
      description,
      user_id: user._id
    })
      .then(todo=>{
        globalTodo = todo
        return User.updateOne({_id: user._id},{
          $push: {todos_id: todo._id}
        })
      })
      .then(user=>{
        res.status(201).json(globalTodo)
      })
      .catch(next)
  }

  static editTodo(req, res, next){
    const _id = req.params.id
    const {title, description} = req.body
    Todo.findOneAndUpdate({_id}, {
      title,
      description
    })
      .then(todo=>{
        res.status(201).json(todo)
      })
      .catch(next)
  }

  static doneTodo(req, res, next){
    const _id = req.params.id
    Todo.findOneAndUpdate({_id},{
      done: true
    })
      .then(todo=>{
        res.status(201).json(todo)
      })
      .catch(next)
  }

  static undoneTodo(req, res, next){
    const _id = req.params.id
    Todo.findOneAndUpdate({_id},{
      done: false
    })
      .then(todo=>{
        res.status(201).json(todo)
      })
      .catch(next)
  }

  static deleteTodo(req, res, next){
    const user = req.loggedUser
    const _id = req.params.id
    const project_id = req.params.project
    let globalTodo = ''
    Todo.findOneAndDelete({_id})
      .then(todo=>{
        globalTodo = todo
        return User.updateOne({_id: user._id}, {
          $pull: {todos_id: todo._id}
        })
      })
      .then(user=>{
        return Project.updateOne({_id: project_id},{
          $pull: {todos_id: _id}
        })
      })
      .then(project=>{
        res.status(201).json(globalTodo)
      })
      .catch(next)
  }

  static getTodosProject(req, res, next){
    const project_id = req.params.project
    Todo.find({project_id})
    .populate('project_id')
    .sort({createdAt: 'desc'})
      .then(todos=>{
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static createTodoProject(req, res, next){
    const project_id = req.params.project
    const {title, description} = req.body
    const user = req.loggedUser
    let globalTodo = ''
    Todo.create({
      title,
      description,
      project_id,
      user_id: user._id
    })
      .then(todo=>{
        globalTodo = todo
        return Project.updateOne({_id: project_id},{
          $push: {todos_id: todo._id}
        })
      })
      .then(project=>{
        res.status(201).json(globalTodo)
      })
      .catch(next)
  }
}

module.exports = TodoController