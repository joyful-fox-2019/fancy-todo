const verifyJwt = require('../helpers/verifyJwt') // ini dugunaka buat men-decoded token
const User = require('../models/user')
const Todo = require('../models/todo')
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    try {     
        console.log(req.params.todoId)
        Todo.
        findById(req.params.todoId)        
        .then(todo => {    
            if (todo) { // setelah dicari periksa ada atau tidak
                if (String(todo.user) == req.user._id) { // kalau ada, langsung periksa apakah UserId dari todo sama dengan
                    next()  // user id dari User(yang diperoleh dari req.user.id hasil authenticate)
                } else {
                    res.status(401).json({ // kalo id nya berbeda maka kirim pesan
                        msg : `you are not authorized`
                    })
                    
                }
            } else { // kalau data tidak ditemukan
                res.status(404).json({
                    msg : `no data found`
                })
                
            }
        })        
        
    } catch(err) {  
        console.log(err)    
    }

    // let todoId = req.params.id
    // User.findOne({_id : req.loggedUser.id})
    // .then(data =>{
    //     if(data.todoList.includes(todoId)){
    //         next()
    //     }else{
    //         next({
    //             status : 403,
    //             message : "NOT Authorized"
    //         })
    //     }
    // })
    // .catch(next)
}