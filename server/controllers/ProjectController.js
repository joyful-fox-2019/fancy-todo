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
        let id = req.params.id
        let OwnerId = req.loggedUser._id
        let arrTemp = []
        let err
        Project.findById(id)
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
                _id: id
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

    static findProject (req, res, next) {
        Project.find({
            MemberId: req.loggedUser._id
        })
        .populate('OwnerId')
        .then (result => {
            res.status(200).json({ result })
        })
        .catch (err => {
            next(err)
        })
    }

    static deleteProject (req, res, next) {
        let err
        Project.findByIdAndDelete(req.params.id)
        .then (result => {
            res.status(200).json(result)
        })
        .catch (() => {
            err = new Error('Data Not Found')
            err.name = 'DataError' 
            next(err)
        })
    }

    static createToDo (req, res, next) {
        let { title, description, dueDate, _id } = req.body
        ToDo.create({
            title,
            description,
            dueDate
        })
        .then (result => {
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
        let { id } = req.body
        let { ToDoId } = req.params
        let arrTemp = []
        Project.findById(id)
        .then (result => {
            for (let i = 0; i < result.ToDoId.length; i++) {
                if (ToDoId == result.ToDoId[i]) {
                    result.ToDoId.splice(i, 1)
                }
            }
            arrTemp = result.ToDoId
            return Project.findByIdAndUpdate(id, {$set: {
                ToDoId: arrTemp
            }})
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (() => {
            let err
            err = new Error('Data Not Found')
            err.name = 'DataError' 
            next(err)
        })
    }

    static findAllToDo (req, res, next) {
        let { id } = req.params
        Project.findById(id)
        .populate('ToDoId')
        .then (result => {
            if (result != null) res.status(200).json(result)
            else {
                let err
                err = new Error('Data Not Found')
                err.name = 'DataError' 
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    }

    static findOneToDo (req, res, next) {
        let { ToDoId } = req.params
        let err
        ToDo.findById(ToDoId)
        .then (result => {
            if (result) res.status(200).json(result)
            else {
                err = new Error('Data Not Found')
                err.name = 'DataError' 
                next(err)
            }
        })
        .catch (() => {
            err = new Error('Data Not Found')
            err.name = 'DataError' 
            next(err)
        })
    }

    static updateToDoStatus (req, res, next) {
        let { status } = req.body
        let { ToDoId } = req.params
        ToDo.findByIdAndUpdate(ToDoId, {$set: { status }})
        .then (result => {
            res.status(200).json(result)
        })
        .catch (() => {
            let err
            err = new Error('Data Not Found')
            err.name = 'DataError' 
            next(err)
        }) 
    }

    static updateToDoAll (req, res, next) {
        let { title, description, dueDate } = req.body
        let { ToDoId } = req.params
        ToDo.findByIdAndUpdate(ToDoId, {$set: { title, description, dueDate }})
        .then (result => {
            res.status(200).json(result)
        })
        .catch (() => {
            let err
            err = new Error('Data Not Found')
            err.name = 'DataError' 
            next(err)
        })
    }
}

module.exports = ProjectController