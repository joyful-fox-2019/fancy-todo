const Project = require('../models/Project')
const User = require('../models/User')

class ProjectController{
  static getProjects(req, res, next){
    const _id = req.loggedUser._id
    Project.find({users_id: _id})
      .then(projects=>{
        res.status(200).json(projects)
      })
      .catch(next)
  }

  static getOneProject(req, res, next){
    const _id = req.params.project
    Project.findOne({_id})
    .populate('users_id')
      .then(project=>{
        res.status(200).json(project)
      })
      .catch(next)
  }

  static createProject(req, res, next){
    const {_id} = req.loggedUser
    const {name} = req.body
    let globalProject = ""
    Project.create({
      users_id: _id,
      name
    })
      .then(project=>{
        globalProject = project
        return User.updateOne({_id},{
          $push: {projects_id: project._id}
        })
      })
      .then(user=>{
        res.status(201).json(globalProject)
      })
      .catch(next)
  }

  static invite(req, res, next){
    const _id = req.params.project
    const {email} = req.body
    let globalProject = ''
    let userId = ''
    let userInvited = ''
    if(!email){
      next({
        errors: {
          status: 400,
          msg: 'input email you want to invite'
        }
      })
    }
    else{
      User.findOne({email})
        .then(user=>{
          if(!user){
            throw {
              errors: {
                status: 400,
                msg: 'user not found'
              }
            }
          }
          else{
            userInvited = user
            userId = user._id
            return Project.findOne({_id})
          }
        })
        .then(project=>{
          if(project){
            let isInvited = false
            globalProject = project
            project.users_id.forEach(user=>{
              console.log(user)
              console.log(userId)
              console.log('=======')
              if(String(user) == userId){
                isInvited = true
              }
            })
            console.log(isInvited);
            
            if(isInvited){
              throw {
                errors: {
                  msg: 'user already in group',
                  status: 400
                }
              }
            }
            else{
              return Project.findOneAndUpdate({_id: project._id},{
                $push: {users_id: userId}
              })
            }
          }
          else{
            throw {
              errors: {
                msg: 'Project not found',
                status: 400
              }
            }
          }
        })
        .then(project=>{
          return User.updateOne({email},{
            $push: {projects_id: project._id}
          })
        })
        .then(user=>{
          res.status(201).json({
            globalProject,
            userInvited
          })
        })
        .catch(next)
    }
  }

  static kick(req, res, next){
    const _id = req.params.project
    const {user_id} = req.body
    let globalProject
    Project.findOneAndUpdate({_id},{
      $pull: {users_id: user_id}
    })
      .then(project=>{
        globalProject = project
        return User.findOneAndUpdate({_id: user_id},{
          $pull: {projects_id: _id}
        })
      })
      .then(user=>{
        res.status(201).json(globalProject)
      })
      .catch(next)
  }
}

module.exports = ProjectController