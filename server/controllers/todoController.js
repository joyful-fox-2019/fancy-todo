const Todo = require('../models/todo')
const Project = require('../models/project')

class todoController {
    static displayAll(req, res, next) {
        const id = {
            user: req.LoggedUser.id
        }

        Todo.find(id)
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static create(req, res, next) {
        const createdData = {
            title: req.body.title, 
            description: req.body.description,
            user: req.LoggedUser.id,
        }

        Todo.create(createdData)
            .then(todo => {
                res.status(201).json({
                    todo, msg: 'Task is successfully created'
                })
            })
            .catch(next)
    }

    static createForProject(req, res, next) {
        const project_id = req.params.id
        const createdData = {
            title: req.body.title, 
            description: req.body.description,
            project:project_id
        }

        Todo.create(createdData)
            .then(todo => {
                return Project.findByIdAndUpdate(project_id, {
                    $push: {
                        todo: todo._id
                    }
                })
                    .then(data => {
                        res.status(201).json({
                            todo, msg: 'Task is successfully created'
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const id = {
            _id: req.params.id
        }

        const updatedData = {
            title: req.body.title,
            description: req.body.description
        }

        Todo.findByIdAndUpdate(id, updatedData)
            .then(todo => {
                res.status(200).json({
                    todo, msg: 'Task is successfully updated'
                })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const id = {
            _id: req.params.id
        }
        
        Todo.findByIdAndDelete(id)
            .then(todo => {
                res.status(200).json({
                    todo, msg: 'Task is successfully deleted'
                })
            })
            .catch(next)
    }

}

module.exports = todoController