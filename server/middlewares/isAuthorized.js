const Todo = require('../models/todo')

function isAuthorized(req, res, next) {
    if(req.LoggedUser) {
        try {
            Todo.findById(req.params.id)
                .then(todo => {
                    if(todo.user == req.LoggedUser.id) {
                        next()
                    } else {
                        res.status(401).json({
                            message: 'Validation Error: Users exclusive feature'
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({
            message: 'Token not found'
        })
    }
}

module.exports = isAuthorized