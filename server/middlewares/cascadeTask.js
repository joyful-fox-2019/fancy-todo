const Project = require('../models/Project')

module.exports = (req, res, next) => {
  Project.findOne({ tasks: req.params.id })
    .then(project => {
      if(project) {
        return Project.findByIdAndUpdate(project.id,
          {
            $pullAll: { tasks: [req.params.id] }
          })
      } else {
        return null
      }
    })
    .then(_ => {
      res.status(200).json(req.task)
    })
    .catch(next)
}