const Todo = require("../models/todo");
const User = require("../models/user");


class TodoController {
    static findAll(req, res, next) {
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
            username
        } = req.body
        Todo.create({
                title,
                description,
                username
            })
            .then((todo) => {
                res.status(201).json(todo);
            })
            .catch(next);
    }

    static update(req, res, next) {
        const {
            title,
            description
        } = req.body

        Todo.update({
                _id: req.body.id
            }, {
                title,
                description
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
}

module.exports = TodoController;