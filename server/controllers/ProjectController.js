const Project = require('../models/Project')
const User = require('../models/User')
const Todo = require('../models/Todo')

class ProjectController {
    static findOne(req,res,next) {
        let {id} = req.params
        Project.findById({_id:id})
            .populate('todoId')
            .then(data=>{
                res.json(data)
            })
            .catch(next)
    }
    static findAll(req,res,next) {
        Project.find()
            .then(result=>{
                let data = []
                for(let i = 0; i< result.length; i++) {
                    if(result[i].owner == req.loggedUser._id) {
                        data.push(result[i])
                    } else {
                        for(let j = 0; j < result[i].members.length; j++) {
                            if(result[i].members[j] == req.loggedUser._id) {
                                data.push(result[i])
                            }
                        }
                    }
                }
                res.json(data)
            })
            .catch(next)
    }
    static create(req,res,next) {
        let { name } = req.body
        let owner  = req.loggedUser._id
        Project.find({name})
            .then(result=>{
                if(result && result.length !=0) {
                    res.status(401).json({message:'Project name is already taken'})
                } else {
                    return Project.create({name,owner})
                }
            })
            .then(result=>{
                res.status(201).json({project:result})
            })
            .catch(next)
    }
    static addMember(req,res,next) {
        let { id } = req.params
        let { email } = req.body
        User.find({email})
            .then(result=>{
                if(result && result.length != 0) {
                    return Project.findOneAndUpdate({_id:id},{$push : {members : result[0]._id}},{new : true})
                } else {
                    res.status(404).json({message: 'email is not found'})
                }
            })
            .then(result=>{
                res.status(201).json(result)
            })
            .catch(next)
    }
    static deleteProject(req,res,next) {
        let { id } = req.params
        Project.deleteOne({_id:id})
            .then(_=>{
                res.status(201).json({message:'project deleted'})
            })
            .catch(next)
    }
    static addTodos(req,res,next) {
        let { id } = req.params
        let { title,description,dueDate } = req.body
        Todo.create({ title,description,dueDate })
            .then(result=>{
                return Project.findOneAndUpdate({_id:id},{$push : {todoId : result._id}},{new : true})
            })
            .then(result=>{
                res.status(201).json(result)
            })
            .catch(next)
    }
    static deleteTodos(req,res,next) {
        let { id,todoId } = req.params
        Todo.deleteOne({_id:todoId})
            .then(_=>{
                return Project.update({_id:id}, {"$pull": { todoId: {id : todoId} }}, { safe: true, multi:true })
            })
            .then(data=>{
                console.log(data);
                
                res.status(201).json({message:'Todo deleted'})
            })
            .catch(next)
    }
    static updateTodos(req,res,next) {
        let { id,todoId } = req.params
        let { title,description,dueDate } = req.body
        Todo.update({ _id:todoId },{ title,description,dueDate })
            .then(_=>{
                return Project.update({_id:id}, {"$pull": { todoId: {id : todoId} }}, { safe: true, multi:true })
            })
            .then(_=>{
                res.status(201).json({message:'update success'})

            })
            .catch(next)
    }
    static changeStatus(req,res,next) {
        let { id,todoId } = req.params
        let {status} = req.body
        Todo.update({_id:todoId},{status})
            .then(data=>{
                // console.log(data,'dataaa');
                
                return Project.update({_id:id}, {"$pull": { todoId: {id : todoId} }}, { safe: true, multi:true })
            })
            .then(_=>{
                res.status(201).json({message:'status updated'})
            })
            .catch(next)
    }
}

module.exports = ProjectController