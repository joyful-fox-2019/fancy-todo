const Task = require('../models/task')

class TaskController {
  static list(req, res, next) {
    Task.find({ UserId: req.user.id })
      .then(results => {
        results.sort((a, b) => a.dueDate - b.dueDate)
        res.status(200).json(results)
      })
      .catch(next)
  }
  static add(req, res, next) {
    let { title, description, dueDate } = req.body
    let today = new Date()
    let reg = null
    if (!dueDate) {
      let err = new Error('Date must be inputted')
      next(err)
    } else {
      reg = new Date(dueDate)
    }
    if (reg.getDate() < today.getDate()) {
      let err = new Error('Date must be same or greater than today')
      next(err)
    }
    let taskData = {
      title,
      description,
      status: 'Active',
      dueDate,
      UserId: req.user.id
    }
    Task.create(taskData)
      .then(task => {
        res.status(201).json(task)
      })
      .catch(next)
  }
  static detail(req, res, next) {
    Task.findOne({ _id: req.params.id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static update(req, res, next) {
    let { title, description, status, dueDate } = req.body
    Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, status, dueDate }
    )
      .then(task => {
        res.status(200).json(task)
      })
      .catch(next)
  }
  static undo(req, res, next) {
    Task.findOneAndUpdate(
      { _id: req.params.id },
      { status: 'Active' }
    )
      .then(task => {
        res.status(200).json(task)
      })
      .catch(next)
  }
  static delete(req, res, next) {
    Task.findByIdAndDelete({ _id: req.params.id })
      .then(task => {
        res.status(200).json(task)
      })
      .catch(next)
  }
  static search(req, res, next) {
    Task.find({'title': {'$regex': req.query.title, '$options': 'i'}})
    .then(books => {
      res.status(200).json(books)
    })
    .catch(next)
  }

}

module.exports = TaskController