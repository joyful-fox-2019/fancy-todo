const Project = require('../models/project')

function isProjectAuthorized(req, res, next) {
    if(req.LoggedUser) {
        try {
            Project.findById(req.params.id)
                .then(project => {
                    if(project.user.indexOf(req.LoggedUser.id) != -1) {
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

module.exports = isProjectAuthorized