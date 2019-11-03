const Todo = require('../models/Todo')

class TodoController {
    static create(req,res,next) {
        let userId = req.loggedUser._id
        let { title,description,dueDate,projectId } = req.body
        Todo.create({
            title,description,dueDate,projectId,userId
        })
            .then(data=>{
                res.status(201).json({message:'Todo created',data})
            })
            .catch(next)
    }
    static findAll(req,res,next) {
        let userId = req.loggedUser._id
        Todo.find({
            userId
        })
            .sort({ 'dueDate': 1 }).exec()
            .then(data=>{
                res.json({data})
            })
            .catch(next)
    }
    static findOne(req,res,next) {
        let {id} = req.params
        Todo.findById(id)
            .then(data=>{
                res.json({data})
            })
            .catch(next)
    }
    static update(req,res,next) {
        let {id} = req.params
        let { title,description,dueDate } = req.body
        Todo.update({ _id:id },{ title,description,dueDate })
            .then(_=>{
                res.status(201).json({message:'update success'})
            })
            .catch(next)
    }
    static delete(req,res,next) {
        let {id} = req.params
        Todo.deleteOne({_id: id})
            .then(data=>{
                res.status(201).json({message: 'delete success'})
            })
            .catch(next)
    }
    // change status in client ?
    static changeStatus(req,res,next) {
        let {id} = req.params
        let {status} = req.body
        Todo.update({_id:id},{status})
            .then(_=>{
                res.status(201).json({message:'status updated'})
            })
            .catch(next)
    }
}

module.exports = TodoController