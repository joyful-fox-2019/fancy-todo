const Todo = require('../models/todo')


module.exports = function (req, res, next) {
    let id = req.params.id
    Todo.findById(id)
        .populate('user')
        .then(todo => {
            if (todo.user._id.toString() === req.decoded.id) {
                next()
            } else {
                throw {
                    status: '401',
                    message: 'Unauthorized'
                }
            }
        })
        .catch(next)
}