const Project = require('../models/Project')

module.exports = {
  find: (req, res, next) => {
    Project.find({ members: req.loggedUser.id })
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
    const { name, member, task } = req.body
    Project.findByIdAndUpdate(req.params.id,
      {
        name,
        $addToSet: { members: member, tasks: task }
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
        res.status(200).json(project)
      })
      .catch(next)
  }
}