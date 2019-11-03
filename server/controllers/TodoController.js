const Todo = require('../models/todo.js');

class TodoController {
    static find(req, res) {
        Todo.find({
            userId : req.params.id
        })
        .then(( todos ) => {
            res.status(200).json( todos )
        })
        .catch(( err ) => {
            res.status(500).json(err.message)
        })
    }

    static create(req, res) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
            dueTime: req.body.dueTime,
            createdAt: req.body.createdAt,
            completedAt: req.body.completedAt,
            userId: req.body.userId
        })
        .then(()=> {
            res.status(201).json({ message: 'successfuly create new todo', todoDetails: req.body })
        })
        .catch(( err )=> {
            res.status(500).json(err.message)
        })
    }

    static update(req, res) {
        Todo.findById(req.params.id) 
        .then(( todo )=> {
            let checkStatus = null
            let completed = null

            if ( todo.status == false) {
                checkStatus = true
                completed = new Date
            } else {
                checkStatus = false
            }
            return todo.update({
                status : checkStatus,
                completedAt : completed
            })
        })
        .then(()=> {
            res.status(200).json({ message: 'Successfully update todo' })
        })
        .catch(( err ) => {
            res.status(500).json(err.message)
        })  
    }

    static delete(req, res) {
        Todo.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'Successfully delete todo' })
        })
        .catch((err)=> {
            res.status(500).json(err.message)
        })
    }
}

module.exports = TodoController