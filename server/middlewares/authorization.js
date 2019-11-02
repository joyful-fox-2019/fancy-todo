const TodoController = require('../controllers/todoController'); 

module.exports = (req, res, next) =>{
    TodoController.getUserId(req.params.id)
    .then(userId =>{
        if(userId != req.userid){
            res.status(401).json({msg: `Authorization failed. You don't have access to this todo.`})
        }
        next();
    })
    .catch(err=>{
        res.send(500).json(err);
    })
}