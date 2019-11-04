const {verify} = require('../helpers/jwt')
const {Project, Todo} = require('../models')

module.exports = {
  authentication : (req, res, next) => {
    try {
      const decode = verify(req.headers.token)
      req.loggedUser = decode
      next()
    }
    catch(err){
      next({ status: 400, message: 'You must login first.' })
    }
  },
  projectAuth : (req, res, next) => {
    const { id } = req.params
    Project.findOne({_id: id, members: req.loggedUser.id })
      .then(project => {
        if(project) {
          next()
        } else {
          next({status:403, message: 'Authorization failed'})
        }
      })
      .catch(next)
  },
  todoAuth : (req, res, next) => {
    const {id} = req.params
    Todo.findById(id)
      .then(todo => {
        if(todo && todo.owner.toString() === req.loggedUser.id) {
          next()
        } else {
          next({status: 403, message: 'Authorizatoin failed'})
        }
      })
      .catch(next)
  },
  projectToDoAuth: (req, res, next) => {
    const { id, projectId } = req.params
    Todo.findOne({ _id: id, project: projectId })
      .then(todo=>{
        if(!todo) next({status: 404, message: 'Not found'})
        else {
          return Project.findOne({ _id: projectId, members: req.loggedUser.id})
        }
      })
      .then(project=>{
        if(project){
          next()
        } else {
          next({ status: 403, message: 'Authorization failed'})
        }
      })
      .catch(next)
  }
}