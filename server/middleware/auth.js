const { verifyedToken } = require('../helpers/jwt')
const Todos = require('../models/todo')
const Project = require('../models/project')


function authentication(req, res, next) {
  try {
    let decodeToken = verifyedToken(req.headers.token)
    req.logedUser = decodeToken
    next()
  }
  catch{
    res.status(401).json('You are not Authentication!')
  }
}

function authorization(req, res, next) {
  let { _id } = req.logedUser
  let idTodo = req.params.id
  Todos.findById({ _id: idTodo })
    .then(todo => {
      if (todo.userId == _id) {
        next()
      } else {
        res.status(401).json('You are not Authorized!')
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

function authProject(req, res, next) {
  let { _id } = req.logedUser
  let { projectId } = req.params
  Project.findById({ _id: projectId })
    .then(data => {
      if (data.owner == _id) {
        next()
      } else {
        status(401).json('You are not Authorized!')
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

function authMember(req, res, next) {
  let { _id } = req.logedUser
  let { projectId } = req.params
  Project.findById({ _id: projectId }).populate('members', '_id')
    .then(data => {
      if (data) {
        let member = false
        data.members.forEach((el, i) => {
          if (el._id == _id) {
            member = true
            next()
          } else if (i == data.members.length - 1 && member == false) {
            res.status(401).json('You are not Authorized!')
          }
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}



module.exports = { authentication, authorization, authProject, authMember }