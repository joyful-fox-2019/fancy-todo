const Todo = require('../models/todo');
const { Types } = require('mongoose');

class TodoController {
    static create(req, res) {
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.userid
        })
            .then(todo => {
                res.status(201).json(todo);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static getAll(req, res) {
        Todo.find({
            UserId: req.userid
        })
            .then(todos => {
                res.status(200).json(todos);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static done(req, res) {
        Todo.updateOne({
            _id: Types.ObjectId(req.params.id)
        }, {
            status: 'done'
        })
            .then(response => {
                res.status(204).json();
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static delete(req, res) {
        Todo.deleteOne({
            _id: Types.ObjectId(req.params.id)
        })
            .then(resolve => {
                res.status(204).json();
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getUserId(todoId) {
        return Todo.findOne({
            _id: Types.ObjectId(todoId)
        })
            .then(todo => {
                return todo.UserId;
            })
            .catch(err => {
                throw new Error(`Fail to get this todos UserId`)
            })
    }
}

module.exports = TodoController;