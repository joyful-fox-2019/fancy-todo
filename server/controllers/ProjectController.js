const Project = require('../models/Project')
const ToDo = require('../models/ToDo')

class ProjectController {
    static createProject (req, res, next) {
        let { name } = req.body
        let MemberId = req.loggedUser._id
        Project.create({
            name,
            MemberId,
            OwnerId: MemberId
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        }) 
    }

    static addMember (req, res, next) {
        let addMember = req.body.member
        let _id = req.body._
        id
        let OwnerId = req.loggedUser._id
        let arrTemp = []
        let err
        Project.findOne({
            _id
        })
        .then (result => {
            arrTemp = result.MemberId
            if (result.OwnerId == OwnerId) {
                return true
            } else {
                err = new Error (`You're unathorized to add member`)
                err.name = 'Unauthorized'
                next(err)
            }
        })
        .then (() => {
            arrTemp.push(addMember)
            return Project.findOneAndUpdate({
                _id
            }, {
                MemberId: arrTemp
            })
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static createToDo (req, res, next) {
        let { title, description, dueDate, _id } = req.body
        let UserId = req.loggedUser._id
        let temp
        ToDo.create({
            title,
            description,
            dueDate,
            UserId
        })
        .then (result => {
            temp = result._id
            return Project.findByIdAndUpdate(_id, {$push: { ToDoId: result._id }})
        })
        .then (result => {
            res.status(201).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static deleteToDo (req, res, next) {
        let { _id } = req.body
        let { ToDoId } = req.params
        let arrTemp = []
        Project.findById(_id)
        .then (result => {
            for (let i = 0; i < result.ToDoId.length; i++) {
                if (ToDoId == result.ToDoId[i]) {
                    result.ToDoId.splice(i, 1)
                }
            }
            arrTemp = result.ToDoId
            return Project.findByIdAndUpdate(_id, {$set: {
                ToDoId: arrTemp
            }})
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findAllToDo (req, res, next) {
        let { _id } = req.body
        Project.findById(_id)
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findOneToDo (req, res, next) {
        let { _id } = req.body
        let { ToDoId } = req.params
        ToDo.findById(ToDoId)
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static updateToDoStatus (req, res, next) {
        let { _id, status } = req.body
        let { ToDoId } = req.params
        ToDo.findByIdAndUpdate(ToDoId, {$set: { status }})
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        }) 
    }

    static updateToDoAll (req, res, next) {
        let { _id, title, description, dueDate } = req.body
        let { ToDoId } = req.params
        ToDo.findByIdAndUpdate(ToDoId, {$set: { title, description, dueDate }})
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = ProjectController