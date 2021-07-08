const Todo = require('../models/Todo');

module.exports = function(req, res, next) {
    try {
        console.log(req.params.id)
        Todo
            .findOne({_id: req.params.id})
            .populate('UserId')
            .then( data => {
                if (data.UserId._id == req.decoded.id) {
                    next()
                } else {
                    let err = {
                        status: 401,
                        message: `No access.`
                    }
                    next(err);
                }
            })
            .catch( err => {
                console.log(err)
            })
    } catch(err) {
        err = {
            status: 404,
            message: `Not found.`
        }
        next(err);
    }
}