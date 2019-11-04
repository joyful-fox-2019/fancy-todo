const Todo = require('../models/todo')

class TodoController {
    static create(req, res, next){
        let {title, description, duedate} = req.body
        Todo.create({
            title,
            description,
            duedate,
            userId: req.loggedUser._id
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static readAll(req, res, next){
        Todo.find({userId:req.loggedUser._id})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static readOne(req, res, next){
        Todo.findById(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static updateAll(req, res, next){
        let {title, description, duedate} = req.body
        if(new Date(duedate) < new Date()){
            next({
                status: 400,
                message: 'Due Date has Passed'
            })
        }
        else{
            Todo.findByIdAndUpdate({_id:req.params.id},
                {
                    title,
                    description,
                    duedate
                }
            )
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(next)
        }
    }
    static updateStatus(req, res, next){
        Todo.findById(req.params.id)
            .then(data => {
                return Todo.findByIdAndUpdate(
                    {
                        _id: req.params.id
                    },
                    {
                        status: !data.status
                    }
                )
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static delete(req, res, next){
        Todo.findByIdAndDelete({_id:req.params.id})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = TodoController