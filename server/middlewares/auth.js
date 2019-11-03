const verifyToken = require('../helpers/tokenMaker').decodeToken
const User = require('../models/user')
const Todo = require('../models/todo')

function authentication(req, res, next) {
    try {
        let decodedToken = verifyToken(req.headers.token)
        // console.log(decodedToken);
        User.findById(decodedToken.id)
            .then(user => {
                // console.log(user);
                if(user) {
                    req.loggedUser = decodedToken
                    next()
                    // console.log(req.loggedUser);
                } else {
                    next({ status: 401, message: "Authentication failed" })
                }
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }
    catch(err) {
        next({ status: 401, message: err })
    }
}

function authorization(req, res, next) {
    let { id } = req.params
    Todo.findById(id)
        .then(todo => {
            if(todo && todo.UserId === req.loggedUser.id) {
                next()
            } else {
                next({ status: 401, message: "Authorization failed" })
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = {
    authentication, authorization
}