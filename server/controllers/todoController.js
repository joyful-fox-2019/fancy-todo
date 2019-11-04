`use strict`
const Todo = require('../models/todo')
const comparePassword = require('../helpers/comparePassword')
const generateToken = require('../helpers/generateToken')
const verifyJwt = require('../helpers/verifyJwt')
const User = require('../models/user')
const moment = require('moment')

class todoController{
    
    static create(req, res, next) {
        Todo.
            create({
                name : req.body.name,
                date : req.body.date,
                user : req.user._id
            })                   
            .then( user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static findAllToday(req, res, next) {
        Todo.
            find({
                user : req.user._id
            })
            .then(todos => {
                let data = todos.filter(todo => {
                    return moment(new Date).isSame(todo.date, 'day')
                })
                res.json(data)
            })
            .catch(next)
    }

    static findAll(req, res, next) {        
        Todo.
            find({
                user : req.user._id
            })
            .then(todos => {  
                res.json(todos)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        Todo.
            findById(req.params.todoId)
            .then(todo => {                
                res.json(todo)
            })
            .catch(next)
    }

    static destroy(req, res, next) {
        Todo.
            findByIdAndDelete(req.params.todoId)
            .then( data => {
                if (data) {
                    res.json(data)
                } else {
                    next({
                        name : 'DataError'
                    })
                }
                
            })
            .catch(next)

    }   

    static update(req, res, next) {
        const{name, date} = req.body
        Todo.findOneAndUpdate({ _id : req.params.todoId}, {name, date})
        .then(function(data){
            res.status(200).json(data)
        })
        .catch(next)
    }
    
}

module.exports = todoController