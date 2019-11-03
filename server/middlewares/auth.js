const { decodeToken } = require('../helpers/jwt')
const User = require('../models/User')
const Task = require('../models/Task')
const Project = require('../models/Project')

module.exports = {
  authentication: (req, res, next) => {
    try {
      if(!req.headers.access_token) {
        throw {status: 401, msg: 'You have to login first'}
      } else {
        const { id } = decodeToken(req.headers.access_token)
        User.findById(id)
          .then(user => {
            if(!user) {
              throw {status: 401, msg: 'You have to login first'}
            } else {
              req.loggedUser = user
              next()
            }
          })
          .catch(next)
      }
    } catch (err) {
      next(err)
    }
  },
  taskAuthorization: (req, res, next) => {
    let isMember = false
    Project.find({ members: req.loggedUser._id })
      .then(projects => {
        projects.forEach(project => {
          if(project.tasks.includes(req.params.id)) {
            isMember = true
          }
        })
        return Task.findById(req.params.id)
      })
      .then(task => {
        if(!task) {
          throw { status: 404, msg: 'Task data not found'}
        } else {
          if(String(task.user) !== String(req.loggedUser._id) && !isMember) {
            throw { status: 401, msg: 'You are not authorized to access this data'}
          } else {
            next()
          }
        }
      })
      .catch(next)
  },
  projectAuthorization: (req, res, next) => {
    Project.findById(req.params.id)
      .then(project => {
        if(!project) {
          throw { status: 404, msg: 'Project data not found'}
        } else {
          if(String(project.members[0]) !== String(req.loggedUser._id)) {
            throw { status: 401, msg: 'You are not authorized to access this data'}
          } else {
            next()
          }
        }
      })
      .catch(next)
  }
}