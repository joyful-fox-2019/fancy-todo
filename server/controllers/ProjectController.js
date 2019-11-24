const Project = require('../model/project')
const Todo = require('../model/todo')
const mongoose = require('mongoose')

class ProjectController {

    static create(req, res, next) {
        let userId = req.decode.id
        const { title, description, dueDate } = req.body
        Project.create({  title, description, dueDate, member: userId })
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static find(req, res, next) {
        let userId = req.decode.id
        Project.find({ member: userId }).populate('member').populate('todoList')
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        let userId = req.decode.id
        let id = mongoose.Types.ObjectId(req.params.id)
        Project.findOne({ member : userId, _id : id }).populate('member').populate('todoList')
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const { title, description, dueDate, status, todoList, member } = req.body
        let id = req.params.id
        Project.findById(id)
            .then(project => {
                if (title) project.title = title
                if (description) project.description = description
                if (status) project.status = status
                if (dueDate) project.dueDate = new Date(dueDate)
                if (todoList) project.todoList.push(todoList)
                if (member) project.member = project.member.push(member)
                return project.save()
            })
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static addMember(req, res, next){
        let { id } = req.params
        let memberId = req.member._id
        Project.findByIdAndUpdate(id, { $push: {member : memberId} })
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static removeMember(req, res, next){
        let { id } = req.params
        let memberId = req.member._id
        Project.findByIdAndUpdate(id, { $pull: {member : memberId} })
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static addTodo(req, res, next){
        let projectId = req.params.id
        const { name, description, dueDate } = req.body
        Todo.create({ name, description, dueDate, projectId })
            .then(todo => {
                return Project.findByIdAndUpdate(projectId, { $push : { todoList: todo._id } })
            })
            .then(project =>{
                res.status(200).json(project)
            })
            .catch(next)
    }

    static updateTodo(req, res, next) {
        const { todoId, name, description, status, dueDate } = req.body
        Todo.findById(todoId)
            .then(response => {
                if (name) response.name = name
                if (description) response.description = description
                if (status) response.status = status
                if (dueDate) response.dueDate = new Date(dueDate)
                return response.save()
            })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)
    }

    static removeTodo(req, res, next){
        let { id }= req.params
        let { todoId } = req.body
        Project.findByIdAndUpdate(id, { $pull: {todoList: todoId } })
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
    }

    static deleteOne(req, res, next) {
        let id = req.params.id
        Todo.deleteMany({ projectId: id })
        .then(()=>{
            return Project.deleteOne({ _id: id })
        })
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
    }

}

module.exports = ProjectController
