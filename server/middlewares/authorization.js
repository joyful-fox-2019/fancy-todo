const jwt = require('../helpers/jwtHandler');
const mongoose = require('mongoose')
const Todo = require('../models/todo');


function authorization(req,res,next){
    Todo.findById(req.params.id)
        .then(todo => {
            if(todo.UserId == req.decoded.id){
                next()
            }else{
                res.status(400).json({
                    msg: 'You dont have permission to do action'
                })
            }
        })
        .catch(err => {
            console.log('error di author', err)
            next(err)
        })
}

module.exports = authorization