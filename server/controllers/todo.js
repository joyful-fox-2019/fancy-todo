const Todo = require("../models/todo");
const mongoose = require('mongoose')

module.exports = {
    create (req, res, next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId : req.logged.id
        })
        .then((todo) => {
            res.status(201).json(todo);
        })
        .catch(next);
    },
    findAll (req, res, next) {
        Todo.find({
            UserId : req.logged.id
        })
        .then((todos) => {
            res.status(200).json(todos);
        })
        .catch(next);
    },
    findTitle (req, res, next) {
        Todo.find({
            title : req.body.title
        })
        .then((todo) => {
            res.status(200).json(todo);
        })
        .catch(next)
    },
    findId (req, res, next) {
        Todo.findOne({
            _id : req.params.id
        })
        .then((todo) => {
            res.status(200).json(todo);
        })
        .catch(next)
    },
    updatePut (req, res, next) {
        let { id } = req.params
        let { title , description , due_date  } = req.body
        let todo = { title, description, due_date }
        Todo.findOneAndUpdate({_id:id},todo,{ new: true })
        .then((todo) => {
            res.status(200).json(todo);
        })
        .catch(next)
    },
    updatePatch (req, res, next) {
        let { id } = req.params
        let { status, title, description } = req.body
        Todo.findOneAndUpdate({_id : id},{status, title, description},{ new:true })
        .then((todo) => {
            res.status(200).json(todo);
        })
        .catch(next)
    },
    delete (req, res, next) {
        let { id } = req.params
        Todo.deleteOne({_id : id})
        .then((deleted) => {
            res.status(200).json(deleted);
        })
        .catch(next)
    }
}
