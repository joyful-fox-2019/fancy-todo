const Project = require('../models/project')
const User = require('../models/user')
const Todo = require('../models/todo')

class ProjectController {
    static findAll(req, res, next){
      Project.find()
        .then(projects => {
          let arr = []
          projects.forEach(project => {
            if(project.owner == req.loggedUser._id){
              arr.push(project)
            }
            else{
              project.members.forEach(member => {
                if(member == req.loggedUser._id){
                  arr.push(project)
                }
              })
            }
          })
          res.status(200).json(arr)
        })
        .catch(next)
    }
    static findOne(req, res, next){
      Project.findById(req.params.id)
        .then(data => {
          res.status(200).json(data)
        })
        .catch(next)
    }
    static create(req, res, next){
      let {name} = req.body
      Project.create({
        name,
        owner: req.loggedUser._id
      })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
    }
    static addMember(req, res, next){
      let {id} = req.params.id
      let {email} = req.body
      User.findOne({email})
        .then(result => {
          if (result){
            return Project.findByIdAndUpdate({_id:id}, {$push : {members: result._id}}, {new: true})
          }
          else{
            next({status: 404, message:"Email not Found"})
          }
        })
        .then(result => {
          res.status(201).json(result)
        })
        .catch(next)
    }
}

module.exports = ProjectController