const Todo = require('../models/todo')
const toUpdate = require('../helpers/updateField')

class TodoController {

    static addTask(req, res, next) {
        console.log(req.body, req.loggedUser._id);
        let { title, description } = req.body,
            userId = req.loggedUser._id
        Todo.create({
            title: title,
            description: description,
            userId: userId
        })
            .then(todo => {
                res.status(201).json({ todo, message: `success added list` })
            })
            .catch(next)
    }

    static find(req, res, next) {
        Todo.find({
            userId: req.loggedUser._id

        })
            .populate("userId")
            .sort({ createdAt: -1 })
            .then(todos => {
                console.log(todos)
                res.status(200).json(todos)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static updateField(req, res, next) {
        console.log('masuk');
        console.log(req.params);
        let dataChanged = toUpdate(['title', 'description'], req.body)
        // console.log(dataChanged);
        Todo.updateOne({
            _id: req.params.id
        }, dataChanged)
            .then(todo => {
                res.status(201).json({ todo, message: 'success updated task' })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Todo.deleteOne({
            _id: req.params.id
        })
            .then(success => {
                res.status(200).json({ success, message: 'success deleting task' })
            })
            .catch(next)
    }
}

module.exports = TodoController