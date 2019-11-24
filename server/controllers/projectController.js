const Project = require('../models/project')
const Todo = require('../models/todo')
const User = require('../models/user')

class projectController {
    static displayAll(req, res, next) {
        let projects_data = []
        Project.find().populate('todo')
            .then(projects => {
                for (let i = 0; i < projects.length; i++) {
                    for (let j = 0; j < projects[i].user.length; j++) {
                        if (projects[i].user[j] == req.LoggedUser.id) {
                            projects_data.push(projects[i])
                        }
                    }
                }
                res.status(200).json(projects_data)
            })
            .catch(next)
    }

    static displayTodos(req, res, next) {
        const project = {
            project: req.params.id
        }

        Todo.find(project)
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static displayUsers(req, res, next) {
        const id = req.params.id
        let users = []

        Project.findById(id).populate('user')
            .then(project => {
                for (let i = 0; i < project.user.length; i++) {
                    if (project.user[i]._id != req.LoggedUser.id) {
                        users.push(project.user[i])
                    }
                }
                res.status(200).json(users)
            })
            .catch(next)
    }

    static displayUsersToInvite(req, res, next) {
        let usersToInvite = []
        const id = req.params.id

        User.find()
            .then(users => {
                const user_data = users.filter(user => {
                    const invitationIds = user.invitations.map(invitation => invitation.id)

                    return invitationIds.indexOf(req.params.id) === -1
                })

                return Project.findById(id)
                    .then(projects => {
                        for (let i = 0; i < user_data.length; i++) {
                            if (projects.user.indexOf(user_data[i]._id) === -1) {
                                usersToInvite.push({
                                    id: user_data[i]._id,
                                    name: user_data[i].name
                                })
                            }
                        }
                        res.status(200).json(usersToInvite)
                    })
                    .catch(next)
            })
            .catch(next)
    }

    static removeUser(req, res, next) {
        const id = req.params.id

        Project.findByIdAndUpdate(id, {
            $pull: {
                user: req.body.id
            }
        })
            .then(project => {
                res.status(200).json({
                    msg: 'Member is successfully removed'
                })
            })
            .catch(next)
    }

    static create(req, res, next) {
        const createdData = {
            name: req.body.name,
            user: req.LoggedUser.id
        }

        Project.create(createdData)
            .then(project => {
                res.status(201).json({
                    project, msg: 'Project is successfully created'
                })
            })
            .catch(next)
    }

    static update(req, res, next) {
        const id = {
            _id: req.params.id
        }
        const updatedData = {
            name: req.body.name
        }

        Project.findByIdAndUpdate(id, updatedData)
            .then(project => {
                res.status(200).json({
                    project, msg: 'Project is successfully updated'
                })
            })
            .catch(next)
        
    }

    static delete(req, res, next) {
        const id = {
            _id: req.params.id
        }

        Project.findByIdAndDelete(id)
            .then(project => {
                return Todo.findOneAndDelete({
                    project: req.params.id
                })
                    .then(todo => {
                        res.status(200).json({
                            project, msg: 'Project is successfully deleted'
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }

}

module.exports = projectController