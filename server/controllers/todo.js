const Todo = require('../models/todo')

class TodoController{
  static create(req, res, next){
    const { title, description, dueDate, status } = req.body
    const userId = req.user.id
    const projectId = req.params.projectid
    Todo.create({ title, description, dueDate, userId, status, projectId})
      .then( result => {
        res.status(201).json(result)
      })
      .catch(next)
  }

  static findall(req, res, next){
    const { id } = req.user
    Todo.find({ userId: id })
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findTodoProject(req, res, next){
    const projectId = req.params.projectid
    console.log(projectId)
    Todo.find({ projectId })
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findOne(req, res, next){
    const { id } = req.params
    Todo.findById(id)
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static delete(req, res, next){
    const { id } = req.params
    Todo.findByIdAndRemove( id )
      .then( result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static update(req, res, next){
    const fields = ['title', 'description', 'dueDate', 'status']
    const { id } = req.params
    let update = {}
    for (let key in req.body){
      fields.forEach(data => {
        if (key == data){ update[key] = req.body[key] }
      });
    }
    Todo.findByIdAndUpdate(id, update)
      .then( result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = TodoController