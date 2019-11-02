const Todo = require('../models/todos')

module.exports = (req,res,next)=>{
    Todo.findOne({_id : req.params.id})
    .then(todo => {
        if(todo.user_id == req.loggedUser.id){
            // console.log(todo.user_id,req.loggedUser.id)
            next()
        }else{
            res.status(500).json({message : 'not authorized'})
        }
    })
}
