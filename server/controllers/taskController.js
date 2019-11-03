'use strict'

const Task = require('../models/task')

class TaskController {
  static list(req, res, next) {
    Task.find({ UserId: req.user.id })
      .then(results => {
        results.sort((a, b) => a.dueDate - b.dueDate)
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }
  static add(req, res, next) {
    let { title, description, dueDate } = req.body
    let today = new Date()
    let reg = null
    if(!dueDate) {
      let err = new Error('Date must be inputted')
      next(err)
    } else {
      reg = new Date(dueDate)
    }
    if(reg.getDate()<today.getDate()) {
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
      .catch(err => {
        next(err)
      })
  }
  static detail(req, res, next) {
    Task.findOne({ _id: req.params.id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
  static update(req, res, next) {
    let { title, description, status, dueDate } = req.body
    Task.updateOne(
      { _id: req.params.id },
      { title, description, status, dueDate }
    )
      .then(task => {
        res.status(200).json(task)
      })
      .catch(err => {
        next(err)
      })
  }
  static undo(req, res, next) {
    Task.updateOne(
      { _id: req.params.id },
      { status: 'Active' }
    )
      .then(task => {
        res.status(200).json(task)
      })
      .catch(err => {
        next(err)
      })
  }
  static delete(req, res, next) {
    Task.deleteOne({ _id: req.params.id })
      .then(task => {
        res.status(200).json(task)
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = TaskController