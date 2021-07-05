const Todos = require('../models/todo')
const getObjUpdate = require('../helpers/objUpdate')

class TodoController{
  static create(req, res, next) {
    let { title, description, dueDate } = req.body
    let userId = req.logedUser._id
    Todos.create({
      title, description, dueDate, userId
    })
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    let userId = req.logedUser._id
    Todos.find({ userId }).sort({ dueDate: 'asc' })
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        next(err)
      })
  }

  static findOne(req, res, next) {
    let { id } = req.params
    Todos.findOne({ _id: id })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        res.status(404).json(err.message)
      })
  }

  static getToday(req, res, next) {
    let userId = req.logedUser._id
    let date = new Date().toISOString().split('T')
    Todos.find({ userId }).sort({ dueDate: 'asc' })
      .then(todos => {
        let dataTodo = []
        todos.forEach(el => {
          el.dueDate.toISOString().split('T')
          if (el.dueDate.toISOString().split('T')[0] == date[0]) {
            dataTodo.push(el)
          }
        })
        res.status(200).json(dataTodo)
      })
      .catch(next)
  }

  static search(req, res, next) {
    let { _id } = req.logedUser
    let { title } = req.params
    let dataTitle = new RegExp(title)
    Todos.find({ userId: _id, title: dataTitle })
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static update(req, res, next) {
    let id = req.params.id
    let dataUpdate = getObjUpdate(req.body)
    Todos.updateOne({ _id: id }, { $set: dataUpdate })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static detele(req, res, next) {
    let id = req.params.id
    Todos.deleteOne({ _id: id })
      .then((respon) => {
        res.status(200).json(respon)
      })
      .catch(next)
  }
}

module.exports = TodoController