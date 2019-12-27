const Todo = require('../models/todo')

class TodoController {
  static create (req, res, next) {
    const { name, desc, due_date } = req.body
    Todo
      .create({
        name,
        desc,
        due_date,
        UserId: req.loggedUser._id
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static get (req, res, next) {
    Todo
      .find({
        UserId: req.loggedUser._id
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static findOne (req, res, next) {
    Todo
      .findById(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static update (req, res, next) {
    const { name, desc } = req.body
    Todo
      .findByIdAndUpdate({
        _id: req.params.id
      }, {
        name,
        desc
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  // static addMember (req, res, next) {
  //   const { member } = req.body
  //   let arrMember = []
  //   Todo
  //     .findById(req.params.id)
  //     .then(result => {
  //       arrMember = result.member
  //       arrMember.push(member)
  //       return Todo
  //         .findByIdAndUpdate({
  //           _id: req.params.id
  //         }, {
  //           member: arrMember
  //         })
  //     })
  //     .then(result => {
  //       res.status(200).json(result)
  //     })
  //     .catch(next)
  // }
  static delete (req, res, next) {
    Todo
      .findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = TodoController
