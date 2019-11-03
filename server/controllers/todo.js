const Todo = require('../models/Todo')

class TodoController {


  static findAll(req, res, next) {
    let userId = req.loggedUser.id
    Todo.find({userId})
    .then(todos => {
      res.status(200).json(todos)
    })
    .catch(next)
  }

  static findOne(req, res, next) {
    let id = req.params.id
    Todo.findById(id)
    .then(todo => {
      res.status(200).json({ todo })
    })
    .catch(next)
  }

  static create(req, res, next) {
    let { title, description, dueDate } = req.body
    Todo.create({ title, description, userId : req.loggedUser.id, dueDate})
    .then(todo => {
      res.status(201).json(todo)
    })
    .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    Todo.findByIdAndDelete(id)
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(console.log)
  }

  static updateAll(req, res, next) {
    let id = req.params.id
    let { title, description, dueDate, status } = req.body
    Todo.findByIdAndUpdate(id, { $set : { title, description, dueDate, status}}, { omitUndefined: true})
    .then(todo => {
      res.status(200).json({ todo })
    })
    .catch(console.log)
  }

  
}

module.exports = TodoController