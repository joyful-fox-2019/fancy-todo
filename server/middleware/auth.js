const { verifyToken } = require('../helpers/jwt')
const Todo = require('../model/todo')
const Project = require('../model/project')
const User = require('../model/user')
const mongoose = require('mongoose')

module.exports = {
    authentication: (req, res, next) => {
        try {
            let decodedToken = verifyToken(req.headers.token)
            req.decode = decodedToken
            next()
        }
        catch (err) {
            next(err)   
        }
    },

    authorization: (req, res, next) => {
        let todoId = req.params.id
        let userId = req.decode.id

        console.log(todoId, '<<<<dari auth');

        Todo.findById(todoId)
            .then(todo => {
                if (!todo) {
                    next({
                        status: 404,
                        msg: 'Todo is Not Found'
                    })
                }
                else if (todo.userId != userId) {
                    next({
                        status: 403,
                        msg: 'Not Authorized'
                    })
                }
                else {
                    next()
                }
            })
            .catch(next)
        },
        
        authorizationProject: (req, res, next) => {
        let projectId = mongoose.Types.ObjectId(req.params.id)

        Project.findById(projectId)
            .then(project => {
                if (!project) {
                    next({
                        status: 404,
                        msg: 'Project is Not Found'
                    })
                }
                else {
                    let userId = req.decode.id
                    Project.findOne({ member : userId, _id : projectId })
                        .then(project => {
                            if(project){
                                next()
                            } else {
                                next({
                                    status: 404,
                                    msg: 'Not Authorized'
                                })
                            }
                        })
                        .catch(next)
                    }
            })
            .catch(next)
    },

    authorizationMember: (req, res, next) =>{
        let { email } = req.body

        User.findOne({ email })
            .then(user =>{
                if(user){
                    req.member = user
                    next()
                }
                else {
                    next({
                        status: 404,
                        msg: 'Member email is Not Found'
                    })
                }
            })
            .catch(next)
    }
}