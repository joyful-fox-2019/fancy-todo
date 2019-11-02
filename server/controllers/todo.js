const Todo = require('../models/todos')
const verifyToken = require('../helpers/tokenGenerator').verifyToken
const User = require('../models/user')


class TodoController {

    static showAll(req,res){
        const payload = verifyToken(req.params.token)
        // console.log(payload)
        if(!payload.username){
            res.status(403).json({status : false})
        }
        User.findOne({
            username : payload.username
        })
        .then(user => {
            return Todo.find({
                user_id : user.id
            })
        })
        .then(todos =>{
            res.status(200).json(todos)
        })
        .catch(err => {
            console.log(err)
        })
}

    static create(req,res){
        console.log(req.body)
        const payload = verifyToken(req.body.id_token)
        User.findOne({username : payload.username})
        .then(user => {
            return Todo.create({
                name : req.body.name,
                description : req.body.description,
                due_date : req.body.due_date,
                user_id : user._id
            })
            .then(data => {
                console.log('sucessfuly created')
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
        })
    }

    static delete(req,res){
        const payload = verifyToken(req.params.token)
        if(!payload.username){
            res.status(403).json({status : false})
        }
        User.findOne({
            username : payload.username
        })
        .then(user => {
            return Todo.find({
                user_id : user.id
            })
        })
        .then(todos =>{
            return Todo.findOneAndDelete({
                 _id : req.params.id
            })
        })
        .then(todos =>{
            res.status(200).json({message : 'succesfully deleted'})
        })
        .catch(err => {
            res.status(500).json({message : err})
        })
    }


    static update(req,res){
        let update = {
            name : req.body.name,
            description : req.body.description,
            due_date : req.body.deadline,
            user_id : req.body.user
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