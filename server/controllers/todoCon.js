const Todo = require('../models/todo')

class TodoController {

    static add(req,res,next) {
        console.log('masuk controller add')
        Todo.create({
            name: req.body.name,
            status: "pending",
            description: req.body.description,
            dueDate: req.body.dueDate,
            UserId: req.loggedUser.id
        })
            .then((newTodo) => {
                res.status(201).json(newTodo)
            }).catch(next)
    }

    static showAll(req,res,next) {
        console.log('masuk controller showAll')
        Todo.find({
            UserId : req.loggedUser.id
        })
            .then((todos) => {
                res.status(200).json(todos)
            }).catch(next)
    }

    static showById(req,res,next) {
        console.log('masuk controller showById')
        let id = req.params.id
        Todo.findById(id)
            .then((todo) => {
                res.status(200).json(todo)
            }).catch(next)
    }

    static updateStatus(req,res,next) {
        console.log('masuk update')
        let newStatus = 'completed'
        let _id = req.params.id
        Todo.findOneAndUpdate({
            _id
        }, {
            status: newStatus
        }, {
            new: true
        })
            .then((todo) => {
                res.status(200).json(todo)
            }).catch(next)
    }

    static delete(req,res,next) {
        console.log('masuk controller delete')
        let _id = req.params.id
        Todo.findOneAndDelete({
            _id
        })
            .then((todo) => {
                res.status(200).json(todo)
            }).catch(next)
    }
}

module.exports = TodoController
