const Todo = require('../model/todo')
const Social = require('../model/social')

class TodoController {

    static create(req, res, next) {
        let userId = req.decode.id
        const { name, description, dueDate } = req.body
        Todo.create({ name, description, dueDate, userId })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static find(req, res, next) {
        let userId = req.decode.id
        Todo.find({ userId })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }


    static search(req, res, next) {
        const { q } = req.query
            Todo.find({
                $or: [   
                    {
                        name: {
                            $regex: `${q}`, $options: 'i'
                        }
                    },
                    {
                        description: {
                            $regex: `${q}`, $options: 'i'
                        }
                    }
                ]
            }).sort({ updatedAt: -1 })
                .then(todos => {
                    res.status(200).json(todos)
                })
                .catch(next)
    }

    static findById(req, res, next) {
        let { id } = req.params
        Todo.findById(id)
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const { name, description, status, dueDate } = req.body
        let id = req.params.id
        Todo.findById(id)
            .then(response => {
                if (name) response.name = name
                if (description) response.description = description
                if (status) response.status = status
                if (dueDate) response.dueDate = new Date(dueDate)
                return response.save()
            })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        let id = req.params.id
        Social.findOneAndDelete({ todoId: id })
            .then(()=>{
               return Todo.findByIdAndDelete(id)
            })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

}

module.exports = TodoController
