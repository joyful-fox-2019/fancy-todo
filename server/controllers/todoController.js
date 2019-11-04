const { Todo, Project } = require('../models')

class TodoController {

  static find (req, res, next) {
    const {id} = req.loggedUser
    const {when} = req.query
    let objParams = {owner: id}
    if(when === 'today') {
      let now = new Date()
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      let tomorrow = new Date()
      tomorrow.setDate(today.getDate()+1)
      let tomorrowDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())
      objParams.deadline = {$gte: today, $lte: tomorrowDate}
    } else if (when === 'thisWeek'){
      let now = new Date()
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      let nextWeek = new Date()
      nextWeek.setDate(today.getDate()+7)
      let nextWeekDate = new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate())
      objParams.deadline = {$gte: today, $lte: nextWeekDate}
    }
    Todo.find(objParams).sort({ createdAt: -1 })
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(next)
  }
  static create (req, res, next) {
    let {title, deadline, description, project} = req.body
    deadline = new Date(deadline)
    Todo.create({title, deadline, description, owner: req.loggedUser.id, project})
      .then(todo => {
          res.status(201).json({todo, message: 'Successfully created an item'})
      })
      .catch(next)
  }
  static findById (req, res, next) {
    const { id } = req.params
    Todo.findById(id)
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }
  static update (req, res, next) {
    const { id } = req.params
    const {title, description, deadline, status} = req.body
    Todo.update({ _id: id }, {title, description, deadline, status}, { omitUndefined: true })
      .then(()=>{
        res.status(200).json({message: 'Successfully updated item'})
      })
      .catch(next)
  }
  static remove (req, res, next) {
    const { id } = req.params
    Todo.remove({ _id: id })
      .then(()=>{
        res.status(200).json({ message: 'Successfully deleted item'})
      })
      .catch(next)
  }
}

module.exports = TodoController
