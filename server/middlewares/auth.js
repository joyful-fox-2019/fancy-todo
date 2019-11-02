const { decodeToken } = require('../helpers/jwt')
const Todo = require('../models/todo')
const User = require('../models/user')


const authentication = (req, res, next) => {
    try {
        req.loggedUser = decodeToken(req.headers.token)
        // console.log(req.loggedUser);
        User.findOne({
            email: req.loggedUser.email
        })
            .then(user => {
                // console.log(user);
                if (user) next()
                else throw new Error({ status: 401, message: 'Oops!! Authentication Failed' })
            })
            .catch(next)
    }
    catch (error) {
        next(error)
    }
}

const authorization = (req, res, next) => {
    console.log(req.body);
    let { id } = req.params
    Todo.findOne({ _id: id })
        .then(todo => {
            console.log(todo, String(todo.userId));
            if (!todo) {
                next({ status: 404, message: 'Oops!! Not Found' })
            }
            else if (todo.userId == req.loggedUser._id) {
                next()
            }
            else {
                next({ status: 403, message: 'Not Authorize' })
            }
        })
        .catch(err => {
            next({ status: 403, message: err })
        })
}


module.exports = {
    authentication,
    authorization
}