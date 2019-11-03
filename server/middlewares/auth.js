const {verifyToken} = require('../helpers/jwt')
const User = require('../models/User')
const Todo = require('../models/Todo')
const Project = require('../models/Project')

function authentication(req,res,next) {
    try {
        let decodedToken = verifyToken(req.headers.token)
        
        User.findOne({_id:decodedToken._id})
        .then(user=>{
            
            if(user) {
                req.loggedUser = decodedToken
                next()
            } else {
                next({status:401, msg:'authentication failed'})
            }
        })
        .catch(next)
    }
    catch (err) {
        next({status:403, msg:'you must login first'})
    }
}

function authorization(req,res,next) {
    let {id} = req.params
    Todo.findOne({_id:id})
    .then(result=>{
        if(result && result.userId == req.loggedUser._id) {
            next()
        } else {
            next({status: 401,msg: "not authorized"})
        }
    })
    .catch(next)
}

function authorizationOwner(req,res,next) {
    let { id } = req.params
    Project.findOne({_id:id})
        .then(data =>{
            if(data.owner == req.loggedUser._id) {
                next()
            } else {
                next({status: 401,msg: "not authorized"})
            }
        })
        .catch(next)
}

function authorizationMember(req,res,next) {
    let { id } = req.params
    Project.findById({_id:id})
        .then(data =>{
            console.log(data,'ini data');
            
            if(data.owner == req.loggedUser._id) {
                next()
            } else if (data.members.includes(req.loggedUser._id))  {
                next()
            }
            else {
                next({status: 401,msg: "not authorized"})
            }
        })
        .catch(next)
}

module.exports = { authentication,authorization,authorizationOwner,authorizationMember }