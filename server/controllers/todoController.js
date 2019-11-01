const mongoose = require('mongoose');
const Todo = require('../models/todo');
const Project = require('../models/project');


module.exports = {
  getTodo (req, res, next) {
    const UserId = req.loggedUser.id;
    Todo.find({ UserId }).populate('UserId')
      .then(todos => {
        if(!todos) throw {msg: 'zero'}
        else {
          for(let i=0; i<todos.length; i++ ){
            if(todos[i].ProjectId){
              todos.splice(i, 1)
            }
          }
          res.status(200).json(todos)
        }
      })
      .catch(next)
  },
  getProjectTodo (req, res, next) {
    const UserId = req.loggedUser.id;
    Todo.find({ UserId }).populate('UserId')
      .then(todos => {
        let temp = []
        for(let i=0; i<todos.length; i++) {
          if(todos[i].ProjectId) {
            temp.push(todos[i])
          }
        }
        res.status(200).json(temp)
      })
      .catch(next)
  },
  createTodo (req, res, next) {
    const UserId = new mongoose.Types.ObjectId(req.loggedUser.id);
    const { title, description } = req.body;
    const due_date = new Date(req.body.due_date);
    Todo.create({ title, description, due_date, UserId })
      .then((todo) => {
        res.status(200).json({msg: 'Success Created Todo', data: todo})
      })
      .catch(next)
  },
  checklist (req,res, next) {
    const _id = req.params.id
    Todo.findOne({ _id })
      .then(todo => {
        if(todo.status) throw {msg: 'ready'}
        else {
          return Todo.findOneAndUpdate({ _id }, { status: true })
        }
      })
      .then(() => {
        res.status(201).json({msg: "success Update status"})
      })
      .catch(next)
  },
  updateTodo (req, res, next) {
    const { title, description } = req.body;
    const _id = req.params.id;
    Todo.findByIdAndUpdate({ _id }, { title, description })
      .then( () => {
        res.status(201).json({msg: 'Success Updated!'});
      })
      .catch(next)
  },
  deleteTodo (req, res, next) {
    const _id = req.params.id;
    Todo.findByIdAndDelete({ _id })
      .then( () => {
        res.status(200).json({msg: 'success deleted!'});
      })
      .catch(next)
  },
  deleteTodoProject (req, res, next) {
    const _id = req.params.id;
    const projectId = req.body.projectId
    Todo.findByIdAndDelete({ _id })
      .then( () => {
        return Project.findByIdAndUpdate({ _id: projectId}, {$pull: {Todo: _id}})
      })
      .then( (project) => {
        res.status(200).json({msg: 'Success delete the project with todo content'})
      })
      .catch(next)
  },
  createTodoForProject (req, res, next) {
    const ProjectId = req.params.id;
    const UserId = req.loggedUser.id;
    const {title, description} = req.body;
    Project.findOne({ _id: ProjectId })
      .then(project => {
        if(!project) throw {msg: 'noProject'}
        else {
          let pass = false;
          for(let i=0; i<project.Members.length; i++) {
            if(project.Members[i] == UserId) {
              pass = true;
            }
          }
          if(!pass) throw {msg: 'member'}
          else {
            return Todo.create({title, description, UserId, ProjectId})
          }
        }
      })
      .then(todo => {
        return Project.findByIdAndUpdate({ _id: ProjectId }, {$push: {Todo: todo._id}})
      })
      .then(() => {
        res.status(201).json({msg: 'success created Todo In Project'})
      })
      .catch(next)
  }
}