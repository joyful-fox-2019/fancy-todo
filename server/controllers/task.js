const Task = require('../models/Task')
const Project = require('../models/Project')

module.exports = {
  find: (req, res, next) => {
    Task.find({ user: req.loggedUser.id })
    .sort({ status: 1, dueDate: 1 })
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
  addOnProject: (req, res, next) => {
    const { name, description, dueDate } = req.body
    const user = req.loggedUser.id
    let addedTask = null
    Task.create({ name, description, dueDate, user })
      .then(task => {
        addedTask = task
        return Project.findByIdAndUpdate(req.params.projectId,
          {
            $addToSet: { tasks: task._id }
          },
          { omitUndefined: true }
        )
      })
      .then(project => {
        res.status(200).json(addedTask)
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
        req.task = task
        next()
      })
      .catch(next)
  }
}