const User = require('../models/user');
const Todo = require('../models/todo');
const Project = require('../models/project');

const { decodeToken } = require('../helpers/jwt');


module.exports = {
  authentication (req, res, next) {
    try{
      if(req.headers.token) {
  
        const decode = decodeToken(req.headers.token);
        User.findOne({ email: decode.email })
          .then(user => {
            if(!user) throw {msg: 'IToken'}
            else {
              req.loggedUser = decode;
              next()
            }
          })
          .catch(next)
      } else {
        throw {msg: 'authen'}
      }
    }
    catch(err) {
      next(err)
    }
  },
  authorizationTodo (req, res, next) {  //  ====> author Todo
    try{
      Todo.findById({ _id: req.params.id })
        .then(todo => {
          if(!todo) throw {msg: 'zero'}
          else {
            if(req.loggedUser.id == todo.UserId) {
              next()
            } else {
              throw {msg: 'author'}
            }
          }
        })
        .catch(next)
    }
    catch(err) {
      next(err)
    }
  },
  authorizationProject (req, res, next) {  //   ===> author Project
    try{
      Project.findById({ _id: req.params.id })
        .then(project => {
          if(project.owner == req.loggedUser.id){
            next()
          }else {
            throw {msg: 'author'}
          }
        })
        .catch(next)
    }
    catch(err) {
      next(err)
    }
  },
  authorizationProjectMember (req, res, next) {    // ====>  only member can come in room / owner
    try{
      Project.findById({ _id: req.params.id })
        .then(project => {
          let pass = false
          if(project.owner == req.loggedUser.id) pass = true
          else {
            for(let i=0; i<project.Members.length; i++){
              if(project.Members[i] == req.loggedUser.id) pass = true
            }
          }
          if(!pass) throw {msg: 'member'}
          else {
            next()
          }
        })
        .catch(next)
    }
    catch(err) {
      next(err)
    }
  },
  authorizationAcceptInvite (req, res, next) {   // ====> author accept
    try{
      User.findById({_id: req.loggedUser.id})
        .then(user => {
          console.log('masuk dalam user auth')
          console.log(user)
          user.Invitation.forEach((el, i) => {
            if(el == req.params.id) {
              console.log(el)
              console.log(req.params.id)
              console.log('masuk kedalam if')
              next()
            }
          })
        })
        .catch(next)
    }
    catch(err) {
      next(err)
    }
  }
}