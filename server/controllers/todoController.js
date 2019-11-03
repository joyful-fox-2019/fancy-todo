const Todo = require('../models/todo');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const ConvertDate = require('../helpers/convertDate')

class TodoController {
    static addTodo(req,res,next){
        let date = ConvertDate(req.body.due_date)
        let newDate = new Date(date)
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            dueDate: newDate,
            UserId: req.decoded.id
        })
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(err => {
            next(err)
        })
    }

    static showTodo(req,res,next){
        Todo.find({
            UserId: req.decoded.id
        })
        .then(todos => {
            if(todos){
                res.status(200).json(todos)
            }else{
                res.status(400).json({
                    msg: 'Cannot find todos'
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static findOne(req,res,next){
        Todo.find({
            _id: ObjectId(req.params.id)
        })
        .then(todo=>{
            let newId = ObjectId(todo[0]._id)
            todo[0]._id = newId
            res.status(200).json(todo)
        })
        .catch(err=>{
            next(err)
        })
    }
    
    static editTodo(req,res,next){
        let date = ConvertDate(req.body.dueDate)
        let newDate = new Date(date)
        Todo.findOneAndUpdate({
            _id: ObjectId(req.params.id)
        },
        {
            title : req.body.title,
            description: req.body.description,
            dueDate: newDate,
            status: true
        })
        .then(todo=>{
            res.status(200).json({
                msg: 'Todo has been updated'
            })
        })
        .catch(err=>{
            next(err)
        })
    }
    
    static deleteTodo(req,res,next){
        Todo.deleteOne({
            _id: req.params.id
        })
        .then(success=>{
            res.status(200).json({
                msg: 'Todo has been deleted'
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static getPending(req,res,next){
        Todo.find({
            UserId: req.decoded.id
        })
        .then(todos=>{
            let pendingTodos = []
            for(let i = 0; i < todos.length; i++){
                if(todos[i].status === false){
                    pendingTodos.push(todos[i])
                }
            }
            res.status(200).json(pendingTodos)
        })
        .catch(err=>{
            next(err)
        })
    }

    static getComplete(req,res,next){
        Todo.find({
            UserId: req.decoded.id
        })
        .then(todos=>{
            let completeTodos = []
            for(let i = 0; i < todos.length; i++){
                if(todos[i].status === true){
                    completeTodos.push(todos[i])
                }
            }
            res.status(200).json(completeTodos)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = TodoController;