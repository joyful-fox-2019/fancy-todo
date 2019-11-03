const User = require('../models/user')
const Todo = require('../models/todo')
const { verify } = require('../helpers/jwtAccess')

module.exports = {
    authentication(req,res,next){
        try{
            if(req.headers.token){
                const decoded = verify(req.headers.token)
                User.findOne({ email : decoded.email })
                .then(user=>{
                    if(!user) throw { msg : 'Token' }
                    else {
                        req.logged = decoded
                        next()
                    }
                })
                .catch(next)
            }
        }
        catch(err){
            next(err)
        }
    },
    authorization(req,res,next){
        try{
            Todo.findOne({ _id : req.params.id })
            .populate("UserId")
            .then(todo=>{
                console.log(todo);
                if(!todo) throw { msg : 'tidak ditemukan!' }
                else {
                    req.loggedUser.id = todo.UserId ? next() : ''
                    throw { msg: 'author' }
                }
            })
            .catch(()=>{})
        }
        catch(err){
            next(err)
        }
    }
}