const ToDo = require('../models/ToDo')

class ToDoController {
    static create (req, res, next) {
        let { title, description, dueDate } = req.body
        dueDate
        let UserId = req.loggedUser._id
        ToDo.create({
            title,
            description,
            dueDate,
            UserId
        })
        .then (result => {
            res.status(201).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findAll (req, res, next) {
        let UserId = req.loggedUser._id
        ToDo.find({
            UserId
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findOne (req, res, next) {
        let { id } = req.params
        ToDo.findById(id)
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static delete (req, res, next) {
        let { id } = req.params
        ToDo.findOneAndDelete({
            _id: id
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static updateStatus (req, res, next) {
        let { id } = req.params
        let { status } = req.body
        ToDo.findOneAndUpdate({
            _id:id
        }, {
            status
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static updateToDo (req, res, next) {
        let { id } = req.params
        let { title, description, dueDate } = req.body
        ToDo.findOneAndUpdate({
            _id:id
        }, {
            title,
            description,
            dueDate
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static searchToDo (req, res, next) {
        let { title } = req.params
        ToDo.find({
            UserId: req.loggedUser._id
        })
        .then (data => {
            if (data.length > 0) {
                for (let el in data) {
                    if (data[el].title.includes(title)) {
                        res.status(200).json(data[el])
                    }
                }
            } else {
                let err = new Error ('ToDo User Masih Kosong')
                err.name = 'DataError'
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = ToDoController