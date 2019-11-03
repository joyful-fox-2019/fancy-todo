const Todo = require("../models/todo")
const User = require("../models/user")

class TodoController{
    static allTodo(req, res, next){
         User.findOne({_id : req.loggedUser.id}).populate('todoList')
         .then(function(data){
             res.status(200).json(data.todoList)
         })
         .catch(next)
    }

    static findOneTodo(req,res,next){
        let todoId = req.params.id
        Todo.findOne({_id : todoId})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static addTodo(req, res, next){
        const{name, description, dueDate} = req.body
        let todo
        Todo.create({name, description, dueDate})
        .then(function(data){
            todo = data
            return User.findOneAndUpdate({email:req.loggedUser.email},{$push: { todoList: data._id }}, {new : true}) 
        })
        .then(function(){
            res.status(201).json(todo)
        })
        .catch(next)
    }
    static deleteTodo(req, res, next){
        const todoId = req.params.id
        let deleted
        Todo.findOneAndDelete({_id : todoId})
        .then(data=>{
            deleted = data
            return User.findOneAndUpdate({_id:req.loggedUser.id}, {$pull: { todoList: todoId }}, { new : true })
        })
        .then(function(){
            res.status(200).json(deleted)
        })
        .catch(next)
    }
    static updateTodo(req, res, next){
        const todoId = req.params.id
        const{name, description, dueDate} = req.body
        Todo.findOneAndUpdate({_id : todoId}, {name, description, dueDate},{runValidators: true,  new: true })
        .then(function(data){
            res.status(200).json(data)
        })
        .catch(next)
        
    }

    static statusTodo(req, res, next){
        const todoId = req.params.id
        const{status} = req.body
        Todo.findOneAndUpdate({_id: todoId}, {status}, {runValidators: true, new : true})
        .then(function(data){
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = TodoController