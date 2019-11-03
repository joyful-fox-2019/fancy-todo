const Project = require('../models/project')
const Todo = require('../models/todo')
const mongoose = require('mongoose')
const getObjUpdate = require('../helpers/objUpdate')

class ProjectController {
  static getAll(req, res, next) {
    let{ _id} = req.logedUser
    Project.find({
      $or: [
        { owner: _id },
        { members: { $in: [_id] } }
      ]
    }).populate({ path: 'members', select: 'email username' })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    let { projectId } = req.params
    Project.findOne({ _id: projectId })
    .populate({ path: 'members', select: 'email username' })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static createProject(req, res, next){
    let owner = req.logedUser
    let { name } = req.body
    Project.create({
      owner, name, members: owner
    })
      .then(project => {
        res.status(201).json(project)
      })
      .catch(next)
  }

  static addMember(req, res, next) {
    let { userId } = req.body
    let { projectId } = req.params
    Project.findById({ _id: projectId })
      .then(data => {
        let exist = 0
        data.members.forEach(el => {
          if (el == userId) {
            exist += 1
          }
        })
        if (exist == 0) {
          data.members.push(mongoose.Types.ObjectId(userId))
          data.save()
          res.status(200).json(data)
        } else {
          throw({ status: 400, message: `User already exist!` });
        }
      })
      .catch(next)
  }

  static deleteMember(req, res, next) {
    let { projectId, userId } = req.params
    Project.findOneAndUpdate({ _id: projectId }, { $pull: { members: mongoose.Types.ObjectId(userId) } })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static leaveProject(req, res, next) {
    let { projectId } = req.params
    let { _id } = req.logedUser
    Project.findById({ _id: projectId })
      .then(data => {
        data.members.pull(mongoose.Types.ObjectId(_id))
        data.save()
        res.status(200).json(data)
      })
      .catch(next)
  }

  static deleteProject(req, res, next) {
    let { projectId } = req.params
    Project.deleteOne({ _id: projectId })
      .then(_ => {
        return Todo.deleteMany({ projectId })
      })
      .then(_ => {
        res.status(200).json({ msg: 'Delete Project Success'})
      })
      .catch(next)
  }

  static addTodo(req, res, next) {
    let { projectId } = req.params
    let { title, description, dueDate } = req.body
    Todo.create({
      projectId, title, description, dueDate
    })
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(next)
  }

  static getTodoProject(req, res, next) {
    let { projectId } =  req.params
    Todo.find({ projectId }).sort({ dueDate: 'asc' })
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateTodo(req, res, next) {
    let { todoId } = req.params
    let dataUpdate = getObjUpdate(req.body)
    Todo.updateOne({ _id: todoId }, { $set: dataUpdate })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static search(req, res, next) {
    let { title, projectId } = req.params
    let dataTitle = new RegExp(title)
    Todo.find({ projectId, title: dataTitle })
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static deleteTodo(req, res, next) {
    let { todoId } = req.params
    Todo.findOneAndDelete({ _id: todoId })
      .then(_ => {
        res.status(200).json({ msg: `Delete TODO successfuly!`})
      })
      .catch(next)
  }
}

module.exports = ProjectController