const Todo = require('../models/todo')
const Project = require('../models/project')

const authorization = (req, res, next) => {
  const _id = req.params.id
  Todo.findOne ({ _id })
  .then(data => {
    console.log(req.user.id, 'dari authoriationnnn')
    console.log(data.userId)
    if (data.userId == req.user.id ) {
      next ()
    } else {
      next({
        status: 400,
        message: `Not Your Account`
      })
    }
  })
  .catch (err => {
    res.json(err)
  })
}

const authorizationProject = (req, res, next) => {
  const _id = req.params.projectid
  console.log(_id, 'authorizatioooon')
  Project.findOne({ _id })
    .then( data => {
      console.log(data)
      return data.members.includes(req.user.id)
    })
    .then( members => {
      console.log(members)
      if ( members ) {
        next()
      } else {
        next({
          status: 400,
          message: `Not Authorized, You dont Have an Access !!`
        })
      }
    })
    .catch(err => {
      res.json(err)
    })
}

module.exports = { authorization, authorizationProject }