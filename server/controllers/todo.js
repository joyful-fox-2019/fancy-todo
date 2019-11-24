const Todo = require("../models/todo.js");

class TodoController {
    static findAll (req, res, next) {
        let status = false;
        if (req.query.status === "completed") {
            status = true;
        }
        Todo.find({
            UserId: req.user._id,
            status: status
        })
        .then((todos) => {
            res.status(200).json(todos);
        })
        .catch((err) => {
            next(err);
        });
    }
    static findOne (req, res, next) {
        Todo.findById(req.params.id)
        .then((todo) => {
            res.status(200).json(todo);
        })
        .catch((err) => {
            err = {
                status: 404,
                messages: `Todo not found.`
            }
            next(err);
        });
    }
    static create (req, res, next) {
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.user._id
        })
        .then((todo) => {
            res.status(201).json(todo);
        })
        .catch((err) => {
            next(err);
        });
    }
    static update (req, res, next) {
        Todo.updateOne({
            _id: req.params.id
        }
        , { $set : {
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date
        }})
        .then((updated) => {
            res.status(200).json(updated);
        })
        .catch((err) => {
            next(err);
        });
    }
    static patchDone (req, res, next) {
        Todo.updateOne({
            _id: req.params.id
        }
        , { $set : {
            status: true
        }})
        .then((updated) => {
            res.status(200).json(updated);
        })
        .catch((err) => {
            next(err);
        });
    }
    static patchUndo (req, res, next) {
        Todo.updateOne({
            _id: req.params.id
        }
        , { $set : {
            status: false
        }})
        .then((updated) => {
            res.status(200).json(updated);
        })
        .catch((err) => {
            next(err);
        });
    }
    static delete (req, res, next) {
        Todo.deleteOne({
            _id: req.params.id
        })
        .then((deleted) => {
            res.status(200).json(deleted);
        })
        .catch((err) => {
            next(err);
        });
    }
}

module.exports = TodoController;