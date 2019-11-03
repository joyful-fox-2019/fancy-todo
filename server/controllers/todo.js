const Todo = require('../models/todo')

class ControllerTodo {
  static getAll(req, res, next) {
    Todo
      .find({
        userId: req.user.id
      })
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static add(req, res, next) {
    const { title, description, dueDate } = req.body

    Todo
      .create({
        title, description, dueDate, completed: false, userId: req.user.id, important: false
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    const todoId = req.params.id
    Todo
      .findOne({
        _id: todoId, userId: req.user.id
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const todoId = req.params.id
    Todo
      .findOneAndDelete({
        _id: todoId, userId: req.user.id
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const todoId = req.params.id
    const { title, description, completed, dueDate, important } = req.body
    Todo
      .findOneAndUpdate({
        _id: todoId, userId: req.user.id
      }, {
        title, description, completed, dueDate, important
      }, {
        omitUndefined: true
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static complete(req, res, next) {
    const todoId = req.params.id
    let completed
    Todo
      .findOne({
        _id: todoId, userId: req.user.id
      })
      .then(todo => {
        if (todo.completed) {
          completed = false
        }
        else {
          completed = true
        }
        return Todo
          .findOneAndUpdate({
            _id: todoId, userId: req.user.id
          }, {
            completed
          })
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static markImportant(req, res, next) {
    const todoId = req.params.id
    let important
    Todo
      .findOne({
        _id: todoId, userId: req.user.id
      })
      .then(todo => {
        if (todo.important) {
          important = false
        }
        else {
          important = true
        }
        return Todo
          .findOneAndUpdate({
            _id: todoId, userId: req.user.id
          }, {
            important
          })
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }
}

module.exports = ControllerTodo