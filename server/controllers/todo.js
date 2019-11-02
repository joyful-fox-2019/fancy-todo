const Todo = require('../models/todos')
const User = require('../models/user')


class TodoController {

    static showAll(req,res){
        // console.log(req.loggedUser)
        const payload = req.loggedUser
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
        // console.log(req.body)
        const payload = req.loggedUser
    //    console.log(payload)
        Todo.create({
            name : req.body.name,
            description : req.body.description,
            due_date : req.body.due_date,
            user_id : payload.id
        })
        .then(data => {
            console.log('sucessfuly created')
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }

    static delete(req,res){
        Todo.findOneAndDelete({
            _id : req.params.id
        })
        .then(todo =>{
            // console.log('dariii todo', todo)
            res.status(200).json({message : 'succesfully deleted', todo : todo})
        })
        .catch(err => {
            res.status(500).json({message : err})
        })
    }

    static update(req,res){
        const payload = req.loggedUser
        let update = {
            name : req.body.name,
            description : req.body.description,
            due_date : req.body.due_date,
            user_id : payload.id
        }
        
        Todo.findOneAndUpdate({ _id : req.params.id}, update)
        .then(todo =>{
            res.status(200).json({message : todo})
        })
        .catch(err =>{
            console.log(err)
        })
    }

    static statusUpdate(req,res){

        let update = {
            status : req.body.status
        }
        Todo.findOneAndUpdate({ _id : req.params.id}, update)
        .then(todo =>{
            res.status(200).json({message : todo})
        })
        .catch(err =>{
            console.log(err)
        })
    }

}


module.exports = TodoController