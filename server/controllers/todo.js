const Todo = require("../models/todo");
const User = require("../models/user");


class TodoController {
    static findAll(req, res, next) {
        console.log(req.body)
        User.findOne({
                name: req.body.username
            })
            .then((user) => {
                return Todo.find({
                    username: user.name
                })
            })
            .then((todos) => {
                res.status(200).json(todos);
            })
            .catch(next);
    }

    static create(req, res, next) {
        const {
            title,
            description,
            status,
            dueDate,
            username,

        } = req.body
        Todo.create({
                title: title,
                description: description,
                status: status,
                dueDate: dueDate,
                username: username
            })
            .then((todo) => {
                res.status(201).json(todo);
            })
            .catch(next);
    }

    static update(req, res, next) {
        const {
            title,
            description,
            dueDate
        } = req.body

        Todo.update({
                _id: req.body.id
            }, {
                title,
                description,
                dueDate
            })
            .then((todo) => {
                res.status(200).json(todo);
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Todo.deleteOne({
                _id: req.body.id
            })
            .then((todo) => {
                res.status(200).json(todo);
            })
            .catch(next);
    }

    static findById(req, res, next) {
        Todo.findById({
                _id: req.body.id
            })
            .then((todo) => {
                res.status(200).json(todo);
            })
            .catch(next);
    }

    static selected(req, res, next) {
        Todo.updateOne({
                _id: req.body.id
            }, {
                status: req.body.status
            })
            .then((todo) => {
                res.status(200).json(todo);
            })
            .catch(next);
    }
}

module.exports = TodoController;