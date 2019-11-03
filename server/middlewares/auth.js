const {verifyToken} = require("../helpers/jwt")
const User = require("../models/user")
const Project = require("../models/project")

const authentication = function(req,res,next){
    try{
        req.loggedUser = verifyToken(req.headers.token)
        
        next()
    }
    catch (err) {
        next ({
            status : 403,
            msg : "not login"
        })
    }
}



const authorization = function(req,res,next){
    let todoId = req.params.id
    User.findOne({_id : req.loggedUser.id})
    .then(data =>{
        if(data.todoList.includes(todoId)){
            next()
        }else{
            next({
                status : 403,
                message : "NOT Authorized"
            })
        }
    })
    .catch(next)

}

//untuk add member dan add project, yang dimana todoId tidak menjadi params
const authorizationGroup = function(req,res,next){
    Project.findOne({_id : req.params.id, UsersId : req.loggedUser.id})
    .then(data=>{
        if(data){
            next()
        }else{
            next({
                status : 403,
                message : "Not Authorized"
            })
        }
    })
    .catch(next)
}

//untuk edt dan delete todo di project, yang dimana todoId menjadi params
const authorizationEditTodoGroup = function(req,res,next){
    Project.findOne({TodosId : req.params.id, UsersId : req.loggedUser.id})
    .then(data=>{
        if(data){
            next()
        }else{
            next({
                status : 403,
                message : "Not Authorized"
            })
        }
    })
    .catch(next)
}

module.exports = {authentication, authorization, authorizationGroup, authorizationEditTodoGroup}