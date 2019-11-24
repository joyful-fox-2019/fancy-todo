const Todo = require('../models/todo')

class TodoController {

    static readAll (req,res,next) {
        let userId = req.decoded.payload.id
        Todo.find({userId: userId})
            .then(function (todos) {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static create (req,res,next) {
        
        let userId = req.decoded.payload.id
        
        let { title, description } = req.body
        Todo.create({
            title: title,
            description: description,
            userId: userId
        })
        .then(function (todo) {
            res.status(201).json(todo)
        })
        .catch(next)
    }

    static delete (req,res,next) {
        console.log('masuuk fungsi delete')
        let todoId = req.params.todoId
        console.log(todoId)
        Todo.findOneAndDelete({_id: todoId})
            .then(function (todo) {
                res.status(202).json({todo, msg: `${todo.title} has been deleted`})
            })
            .catch(next)
    }

    static updateTodo (req,res,next) {
        let userId = req.decoded.id
        let { title, description } = req.body
        let todoId = req.params.todoId
        Todo.findOneAndUpdate({_id: todoId},{ title, description, userId: userId  }, {omitUndefined: true, new: true})
            .then(function(todo) {
                res.status(202).json({ todo, message: 'Todo success updated' })
            })
            .catch(next)
    }

    static updateStatus (req,res,next) {
       
        let todoId = req.params.todoId
        Todo.findOneAndUpdate({_id: todoId},{status: true})
            .then(function (todo) {
                res.status(202).json({ message: `${todo.title} Set to Completed` })
            })
            .catch(function (err) {
                res.status(202).json({message})
            })
    }

    static readOne (reg,res,next) {
        Todo.findOne({ _id: req.params.todoId })
            .then(function (todo){
                res.status(200).json(todo)
            })
            .catch(next)
    }

};

module.exports = TodoController