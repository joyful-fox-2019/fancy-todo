const Todo = require('../models/todo')

class TodoController {
    static create(req, res, next) {
        console.log(req.body)
        if (Object.entries(req.body).length < 2) {
            next('EF')
        }
        Todo.create({
                name: req.body.name,
                description: req.body.description,
                due_date: req.body.date,
                user: req.decoded.id
            })
            .then(todo => {
                res.status(201).json({
                    todo
                })
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        Todo.find({
                user: req.decoded.id
            })
            .populate('user')
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static update(req, res, next) {
        if (Object.entries(req.body).length === 0 || !req.params.id) {
            next('EF')
        }
        Todo.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.date
            })
            .then(result => {
                res.status(200).json({
                    result
                })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        console.log('params', req.params)
        if (!req.params.id) {
            throw '400'
        }
        Todo.findByIdAndRemove(req.params.id)
            .then(result => {
                console.log('ini result', result)
                if (!result) {
                    throw '404'
                }
                res.status(200).json({
                    result
                })
            })
            .catch(next)
    }
}

module.exports = TodoController