const jwt = require('../helpers/jwt');
const Todo = require('../models/todo');

function authentication(req, res, next) {
    try {
        let decoded = jwt.verifyToken(req.headers.token);
        req.decoded = decoded;
        console.log(req.decoded);
        next()
    } catch (err) {
        next(err);
    }
};

function authorization(req, res, next) {
    Todo.findById(req.params.id)
        .then(todo => {
            if (todo) {
                if (todo.user == req.decoded.id) {
                    next()
                } else {
                    res.status(401).json({
                        message: 'Unauthorized user'
                    })
                }
            } else {
                res.status(404).json({
                    message: 'todo is not found!'
                })
            }
        })
        .catch(next);
};

module.exports = {
    authentication,
    authorization
}