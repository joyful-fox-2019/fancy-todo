const Todo = require('../models/todo')
module.exports = (req,res,next) => {
    
    console.log('masuk fungsi autho')
    
    Todo.findOne({_id: req.params.todoId})
        .then(function (todo) {
            
            if (todo.userId == req.decoded.payload.id) {
                next()
            }else {
                next ({status: 403, message: 'You dont have authorize to do that'})
            }
        })
        .catch(function (err) {
            console.log(err)
        })

 
}