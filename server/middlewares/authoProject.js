const Project = require('../models/project')

module.exports = (req,res,next) => {

    Project.findOne ({_id: req.params})
        .then(function (project) {
            project.members.forEach(function(member) {
                if (member.id === req.decoded.payload.id) {
                    next()
                }else {
                    next({status: 403, msg: 'You not Part of this project'})
                }
            })
        })
        .catch(next)
}
