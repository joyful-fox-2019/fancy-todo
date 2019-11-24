const Project = require('../models/project')
const Todo = require('../models/todo')
const User = require('../models/user')

class ProjectController {

    static readAll (req,res,next) {
        Project.find({}).populate('todos').populate('maker').populate('master').populate('members')
            .then(function (projects) {
                res.status(200).json(projects)
            })
            .catch(next)
    }

    static create (req,res,next) {
        console.log(req.body)
        let { title, description } = req.body
        let ownerId = req.decoded.payload.id
        Project.create({
            master : ownerId,
            title : title,
            description : description,
            members: [ownerId]
        })
        .then(function (project) {
            res.status(201).json(project)
        })
        .catch(next)
    }

    static updateMember (req,res,next) {
        let memberId = req.params.memberId
        Project.findOneAndUpdate ({
            owner: ownerId
        },{$push : {members : memberId}},{new: true})
            .then(function (project) {
                res.status(202).json(project)
            })
            .catch(next)
    };

    static addTodo (req,res,next) {
      
        let projectId = req.params.projectId
        let { title, description } = req.body
        let userId = req.decoded.payload.id
        User.findOne({_id: userId}, function (err,user) {
            if (err) {
                next(err)
            }else {
                Todo.create({
                    title: title,
                    description: description,
                    maker: user,
                    projectId: projectId
                }, function (err, todo) {
                    console.log(todo)
                    if (err) {
                        next(err)
                    }else {
                        Project.updateOne({_id: projectId}, {$push: {todos: todo}}, function(err,project) {
                            if (err) {
                                next(err)
                            }else {
                                res.status(201).json({todo,msg: `Todo Successfully Added`})
                            }
                        })
                    }
                })
            }
        })
    };

    static updateTodo (req,res,next) {
        const projectId = req.params.projectId
        let { title, description } = req.body
        Todo.findOneAndUpdate({projectId: projectId},{ title, description }, { omitUndefined: true })
            .then(function (todo) {
                res.status(202).json({ todo, msg: `${todo.title} has been change` })
            })
            .catch(next)
    };   

    static updateStatus (req,res,next) {
        const projectId = req.params.projectId
        Todo.findOneAndUpdate({ projectId: projectId }, { status: true })
            .then(function (todo) {
                res.status(202).json({ todo, msg: `${todo.title} set to completed` })
            })
            .catch(function (err) {
                next({status: 500, msg:'Internal Server Error'})
            })
    }
}

module.exports = ProjectController
