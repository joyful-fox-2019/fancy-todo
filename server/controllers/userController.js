const User = require("../models/user")
const Project = require("../models/project")
const Todo = require("../models/todo")
const {generateToken} = require("../helpers/jwt")
const {comparePassword} = require("../helpers/bcryptjs")
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static register(req,res,next){
        const {email, password} = req.body
        User.create({email, password})
        .then(function(data){
            res.status(200).json(data)
        })
        .catch(next)
    }
    static login(req,res,next){
        const {email, password} = req.body
        User.findOne({email})
        .then(function(data){
            if(data && comparePassword(password, data.password)){
                let payload = {id : data._id, email : data.email}
                let token = generateToken(payload)
                res.status(200).json({token, email})
            }else{
                throw {
                    message: 'invalid email/password',
                    status : 401
                }
            }
        })
        .catch(next)
    }
    static gsign(req,res,next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let emailUser
        console.log(req.body.id_token)
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
            .then(function(ticket){
                console.log(ticket, "masuk g sign")
                let {email}= ticket.getPayload()
                emailUser = email
                return User.findOne({email:emailUser})
            })
            .then(function(data){
                console.log(data)
                if (data){
                    const payload = {id : data._id , email : data.email}
                    let token = generateToken(payload)
                    res.status(201).json({token, email : data.email})
                    return
                }
                else{
                    return User.create({email : emailUser, password:"google"})
                }
            })
            .then(function(data){
                let payload = {id : data._id, email:data.email}
                let token = generateToken(payload)
                res.status(201).json({token, email : data.email})
            })
            .catch(next)
    }

    static seeGroup(req,res,next){
        // console.log(req.loggedUser)
        Project.find({UsersId : req.loggedUser.id}).populate("UsersId").populate("TodosId")
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static seeOneGroup(req,res,next){
        // console.log(req.loggedUser)
        let projectId = req.params.id
        Project.findOne({_id : projectId}).populate("UsersId").populate("TodosId")
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static createGroup(req, res,next){
        const {name} = req.body
        Project.create({name})
        .then(data=>{
            console.log(data)
            return Project.findOneAndUpdate({_id : data._id}, {$push : {UsersId : req.loggedUser.id}}, {new : true})

        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(next)
    }

        
    static addMember(req, res, next){
        const projectId = req.params.id
        console.log("sini VVVVVVVV")
        console.log(projectId)
        let userId
        const {email} = req.body
        console.log(req.body)
        User.findOne({email})
        .then(data=>{
            // console.log(data)
            if(data){
                userId = data._id
                return Project.findOne({_id : req.params.id ,UsersId : data._id})
            }else{
                next({
                    status : 400,
                    message : "Email is not Exist"
                })
            }

        })
        .then(data=>{
            console.log(data, "masuk nih")
            if(data){
                next({
                    status : 400,
                    message : "already in group"
                })
            }else{
                return Project.findOneAndUpdate({_id : projectId}, {$push : {UsersId : userId}}, {new:true})

            }
        })
        .then(data=>{
            if(data){
                res.status(200).json({msg : `Success add ${email} to Group` ,data})
            }
        })
        .catch(next)

        
    }

    static addTodoProject(req,res,next){
        const projectId = req.params.id
        const {name, description, dueDate} = req.body
        Todo.create({name, description, dueDate})
        .then(data=>{
            return Project.findOneAndUpdate({_id:projectId}, {$push : {TodosId : data._id}}, {new : true})
        })
        .then(data=>{
            res.status(200).json({msg : "Success add Todo Project", data})
        })
        .catch(next)
    }

    static editProject(req,res,next){
        const todoId = req.params.id
        const {name, description, dueDate} = req.body
        Project.findOne({TodosId : todoId})
        .then(data=>{
            if(data){
                return Todo.findOneAndUpdate({_id : todoId}, {name, description,dueDate}, {new : true, runValidators:true ,omitUndefined : true})
            }else{
                next({
                    status :400,
                    message : "Project not found"
                })
            }
        })
        .then(data=>{
            if(data){
                res.status(200).json({msg : "Success edit Todo Project", data})
            }
            
        })
        .catch(next)
    }

    static statusProject(req,res,next){
        const todoId = req.params.id
        console.log("MASUK?")
        console.log(todoId)
        const {status} = req.body
        Project.findOne({TodosId : todoId})
        .then(data=>{
            console.log(data)
            if(data){
                return Todo.findOneAndUpdate({_id : todoId}, {status}, {new : true, runValidators:true ,omitUndefined : true})
            }else{
                next({
                    status :400,
                    message : "Project not found"
                })
            }
        })
        .then(data=>{
            console.log("true VVVVVVVVVVVVV")
            console.log(data)
            if(data){
                res.status(200).json({msg : "Success edit Todo Project", data})
            }
            
        })
        .catch(next)
    }

    static deleteTodoProject(req,res,next){
        let todoId = req.params.id
        let todoDeleted
        let projectId
        Project.findOne({TodosId : todoId})
        .then(data=>{
            if(data){
                projectId = data._id
                return Todo.findOneAndDelete({_id : todoId})
            }else{
                next({
                    status :400,
                    message : "Project not found"
                })
            }
        })
        .then(data=>{
            todoDeleted = data
            return Project.findOneAndUpdate({_id : projectId}, {$pull :{TodosId : todoId}})       
        })
        .then(data=>{
            if(data){
                res.status(200).json({msg :"Success delete todo Project", data : todoDeleted})
            }
        })
        .catch(next)
    }


    // //BEFORE MIDDLEWARE
    // static addMember(req, res, next){
    //     const projectId = req.params.id
    //     let userId
    //     const {email} = req.body
    //     Project.findOne({UsersId : req.loggedUser.id})
    //     .then(data=>{
    //         if(data){
    //             return User.findOne({email})
    //         }else{
    //             next({
    //                 status : 403,
    //                 message : "Not Authorized"
    //             })
    //         }
    //     })
    //     .then(data=>{
    //         userId = data._id
    //         return Project.findOne({UsersId : data._id})
    //     })
    //     .then(data=>{
    //         if(data){
    //             next({
    //                 status : 400,
    //                 message : "already in group"
    //             })
    //         }else{
    //             return Project.findOneAndUpdate({_id : projectId}, {$push : {UsersId : userId}}, {new:true})

    //         }
    //     })
    //     .then(data=>{
    //         if(data){
    //             res.status(200).json(data)
    //         }
    //     })
    //     .catch(next)
        
    // }

    // static addTodoProject(req,res,next){
    //     const projectId = req.params.id
    //     const {name, description, dueDate} = req.body
    //     Project.findOne({UsersId : req.loggedUser.id})
    //     .then(data=>{
    //         if(data){
    //             return Todo.create({name, description, dueDate})
    //         }else{
    //             next({
    //                 status : 403,
    //                 message : "not Authorized"
    //             })
    //         }
    //     })
    //     .then(data=>{
    //         return Project.findOneAndUpdate({_id:projectId}, {$push : {TodosId : data._id}}, {new : true})
    //     })
    //     .then(data=>{
    //         res.status(200).json(data)
    //     })
    //     .catch(next)
    // }

    // static editProject(req,res,next){
    //     const todoId = req.params.id
    //     const {name, description, dueDate} = req.body
    //     Project.findOne({UsersId : req.loggedUser.id})
    //     .then(data=>{
    //         if(data){
    //             return Project.findOne({TodosId : todoId})
    //         }else{
    //             next({
    //                 status : 403,
    //                 message :"Not Authorized"
    //             })
    //         }
    //     })
    //     .then(data=>{
    //         if(data){
    //             return Todo.findOneAndUpdate({_id : todoId}, {name, description,dueDate}, {new : true})
    //         }else{
    //             next({
    //                 status :400,
    //                 message : "Project not found"
    //             })
    //         }
    //     })
    //     .then(data=>{
    //         if(data){
    //             res.status(200).json(data)
    //         }
            
    //     })
    //     .catch(next)
    // }

    // static deleteTodoProject(req,res,next){
    //     let todoId = req.params.id
    //     let todoDeleted
    //     let projectId
    //     Project.findOne({UsersId : req.loggedUser.id})
    //     .then(data=>{
    //         if(data){
    //             return Project.findOne({TodosId : todoId})
    //         }else{
    //             next({
    //                 status : 403,
    //                 message :"Not Authorized"
    //             })
    //         }
    //     })
    //     .then(data=>{
    //         if(data){
    //             projectId = data._id
    //             return Todo.findOneAndDelete({_id : todoId})
    //         }else{
    //             next({
    //                 status :400,
    //                 message : "Project not found"
    //             })
    //         }
    //     })
    //     .then(data=>{
    //         todoDeleted = data
    //         return Project.findOneAndUpdate({_id : projectId}, {$pull :{TodosId : todoId}})       
    //     })
    //     .then(data=>{
    //         if(data){
    //             res.status(200).json(todoDeleted)
    //         }
    //     })
    //     .catch(next)
    // }

    static deleteGroup(req,res,next){
        let projectId = req.params.id
        let deletedProject
        Project.findOne({_id: projectId})
        .then(data=>{
            if(req.loggedUser.id == data.UsersId[0]){
                return Project.findOneAndDelete({_id: projectId})
            }else{
                next({
                    status : 403,
                    message : "You're Not The Owner of Project"
                })
            }
        })
        .then(data=>{
            deletedProject = data
            return Todo.deleteMany({_id : {$in : data.TodosId}})
            
        })
        .then(_=>{
            res.status(200).json({msg : 'Success delete Project',data : deletedProject})
        })
        .catch(next)
    }


}

module.exports = UserController