const Todo = require('../models/todos')

class TodoController {

    static showAll(req,res){
        Todo.find()
        .then(todos =>{
            res.status(200).json(todos)
        })
        .catch(err => {
            console.log(err)
        })
    }

    static create(req,res){
        Todo.create({
            name : req.body.name,
            description : req.body.description,
            deadline : req.body.deadline
        })
        .then(todo =>{
            res.status(200).json({message : todo})
        })
        .catch(err => {
            console.log(err)
        })
    }

    static delete(req,res){
        let query = {
            _id : req.params.id
        }
        Todo.findOneAndDelete(query)
        .then(todo =>{
            res.status(200).json({message : todo})
        })
        .catch(err => {
            console.log(err)
        })
    }


    static update(req,res){
        let update = {
            name : req.body.name,
            description : req.body.description,
            deadline : req.body.deadline
        }
        
        Todo.findOneAndUpdate(req.params.id, update)
        .then(todo =>{
            res.status(200).json({message : todo})
        })
        .catch(err => {
            console.log(err)
        })
    }

    static statusUpdate(req,res){
        let update = {
            status : req.body.status
        }

        Todo.findOneAndUpdate(req.params.id, update)
        .then(todo =>{
            res.status(200).json({message : todo})
        })
        .catch(err =>{
            console.log(err)
        })
    }

}


module.exports = TodoController