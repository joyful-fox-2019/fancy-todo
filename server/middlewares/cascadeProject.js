const Task = require('../models/Task')

module.exports = (req, res, next) => {
  console.log(req.project)
  Task.deleteMany({
    _id: {
      $in: req.project.tasks
    }
  })
    .then(_ => {
      res.status(200).json(req.project)
    })
    .catch(next)
}