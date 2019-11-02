const Project = require('../models/Project')
const ToDo = require('../models/ToDo')

module.exports = {
    ProjectAuthorization (req, res, next) {

    },
    OwnerAuhtorization (req, res, next) {

    },
    ToDoAuthorization (req, res, next) {
        let { id } = req.params
        let err
        ToDo.findById(id)
        .populate('UserId')
        .then (result => {
            console.log(result)
            if (result.UserId._id == req.loggedUser._id) {
                next()
            } else {
                err = new Error('Kamu tidak memiliki authorisasi')
                err.name = 'Unauthorized'
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    }
}