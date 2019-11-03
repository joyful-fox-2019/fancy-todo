const Project = require('../models/Project')
const ToDo = require('../models/ToDo')

module.exports = {
    OwnerAuthorization (req, res, next) {
        let { id } = req.params
        let err
        Project.findById(id)
        .then (result => {
            if (result.OwnerId == req.loggedUser._id) {
                next()
            } else {
                err = new Error('Kamu Bukan Pemilik Project ini')
                err.name = 'OwnerError'
                next(err)
            }
        })
        .catch (() => {
            err = new Error('Data Not Found')
            err.name = 'DataError' 
            next(err)
        })
    },
    ToDoAuthorization (req, res, next) {
        let { id } = req.params
        let err
        ToDo.findById(id)
        .populate('UserId')
        .then (result => {
            if (result.UserId._id == req.loggedUser._id) {
                next()
            } else {
                err = new Error('Kamu tidak memiliki authorisasi')
                err.name = 'Unauthorized'
                next(err)
            }
        })
        .catch (err => {
            err = new Error('Data Not Found')
            err.name = 'DataError' 
            next(err)
        })
    }
}