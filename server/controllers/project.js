const Project = require('../models/Project')

module.exports = {
  find: (req, res, next) => {
    Project.find({ members: req.loggedUser.id })
      .then(projects => {
        res.status(200).json(projects)
      })
      .catch(next)
  },
  findOne: (req, res, next) => {
    Project.findById(req.params.id)
    .populate('members').populate('tasks')
      .then(projects => {
        res.status(200).json(projects)
      })
      .catch(next)
  },
  add: (req, res, next) => {
    const { name } = req.body
    Project.create({
      name,
      members: [ req.loggedUser.id ]
    })
      .then(project => {
        res.status(201).json(project)
      })
      .catch(next)
  },
  update: (req, res, next) => {
    const { name } = req.body
    console.log(req.body)
    Project.findByIdAndUpdate(req.params.id,
      {
        name,
        $addToSet: { members: req.body['members[]'] }
      },
      { omitUndefined: true }
    )
      .then(project => {
        res.status(200).json(project)
      })
      .catch(next)
  },
  delete: (req, res, next) => {
    Project.findByIdAndDelete(req.params.id)
      .then(project => {
        req.project = project
        next()
      })
      .catch(next)
  }
}