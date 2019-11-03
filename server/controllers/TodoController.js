const Todo = require('../models/todo')

class TodoController {
    static make(req, res, next) {
        console.log('masukkkkkkkkk');
        // console.log(req.body);
        let objTodo = {
            name: req.body.name,
            description: req.body.description,
            status: false,
            dueDate: req.body.dueDate,
            UserId: req.loggedUser.id
        }
        console.log(objTodo);
        Todo.create(objTodo)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static readAll(req, res, next) {
        Todo.find({UserId: req.loggedUser.id})
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static readOne(req, res, next) {
        Todo.findById(req.params.id)
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static updateField(req, res, next) {
        let { id } = req.params
        let objUpdate = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate
        }
        Todo.findByIdAndUpdate(id, { $set: objUpdate }, { omitUndefined: true })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    static deleteTodo(req, res, next) {
        let { id } = req.params
        console.log(req.params);
        Todo.deleteOne({_id:id})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = TodoController