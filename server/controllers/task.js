const Task = require('../models/Task')

module.exports = {
  find: (req, res, next) => {
    Task.find({ user: req.loggedUser.id })
      .then(tasks => {
        res.status(200).json(tasks)
      })
      .catch(next)
  },
  findOne: (req, res, next) => {
    Task.findById(req.params.id)
      .then(task => {
        res.status(200).json(task)
      })
      .catch(next)
  },
  add: (req, res, next) => {
    const { name, description, dueDate } = req.body
    const user = req.loggedUser.id
    Task.create({ name, description, dueDate, user })
      .then(task => {
        res.status(201).json(task)
      })
      .catch(next)
  },
  update: (req, res, next) => {
    const { name, description, status, dueDate } = req.body
    Task.findByIdAndUpdate(req.params.id,
      { name, description, status, dueDate },
      { omitUndefined: true }
    )
      .then(task => {
        res.status(200).json(task)
      })
      .catch(next)
  },
  delete: (req, res, next) => {
    Task.findByIdAndDelete(req.params.id)
      .then(task => {
        res.status(200).json(task)
      })
      .catch(next)
  }
}