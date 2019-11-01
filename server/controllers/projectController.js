const Project = require('../models/project');
const Todo = require('../models/todo');

module.exports = {
  findAllProject (req, res, next) {
    Project.find().populate('owner')
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(next)
  },
  createProject (req, res, next) {
    const name = req.body.name;
    const owner = req.loggedUser.id;
    Project.create({ name, owner })
      .then( (project) => {
        res.status(200).json({msg: 'Project Created', data: project})
      })
      .catch(next)
  },
  updateNameProject (req, res, next) {
    const { name } = req.body;
    Project.findByIdAndUpdate({ _id: req.params.id }, { name })
      .then( () => {
        res.status(201).json({msg: 'success Updated!'})
      })
      .catch(next)
  },
  deleteProject (req, res, next) {
    Project.findByIdAndDelete({ _id: req.params.id })
      .then( () => {
        return Todo.deleteMany({ ProjectId: req.params.id })
      })
      .then( () => {
        res.status(200).json({msg: 'Projects and Todo content successfully deleted'})
      })
      .catch(next)
  },
  findOneProject (req, res, next) {
    Project.findById({ _id: req.params.id }).populate('Members').populate('Todo')
      .then(project => {
        res.status(200).json(project)
      })
      .catch(next)
  }
}