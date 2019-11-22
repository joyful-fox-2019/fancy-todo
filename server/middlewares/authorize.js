const Task = require('../models/task')

module.exports = (req, res, next) => {
  Task.findOne({ _id: req.params.id})
    .then(result => {
      if(!result) {
        let err = new Error('Task is not found')
        err.code(400)
        next(err)
      } else {
        if(String(result.UserId) === String(req.user.id)) {
          next()
        } else {
          let err = new Error ('You are not authorized')
          err.code = 403
          next(err)
        }
      }
    })
    .catch(err => {
      next (err)
    })
}