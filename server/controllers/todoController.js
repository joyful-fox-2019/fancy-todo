const axiosInstance = require('../api/quote');
const Todo = require('../models/todo');

class TodoController {
    static create(req, res, next) {
        console.log('masukk create', req.decoded)
        // axiosInstance.get('')
        // .then(respone => {
        // let quote = respone.data.content;
        let {
            name,
            description,
            due
        } = req.body
        Todo.create({
                name,
                description,
                due,
                user: req.decoded.id
            })
            // })
            .then(todo => {
                res.status(201).json(todo)
            })
            .catch(next)
    }

    static read(req, res, next) {
        Todo.find({
                user: req.decoded.id
            })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Todo.deleteOne({
                _id: req.params.id
            })
            .then(() => {
                res.status(200).json({
                    message: 'todo is deleted'
                })
            })
            .catch(next)
    }

    static updateMark(req, res, next) {
        let update = {
            status: req.body.status
        }
        Todo.where({
                _id: req.params.id
            }).update(update)
            .then(data => {
                res.status(200).json({
                    message: "success update status"
                })
            })
            .catch(next)
    }

    static updateData(req, res, next) {
        let {
            name,
            description,
            status,
            due
        } = req.body
        let update = {
            name,
            description,
            status,
            due
        }
        Todo.where({
                _id: req.params.id
            }).update(update)
            .then(data => {
                res.status(200).json({
                    message: "succses update all data"
                })
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        Todo.findById({
                _id: req.params.id
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = TodoController;