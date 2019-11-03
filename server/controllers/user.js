const UserModel = require('../models/user')
const { generate } = require('../helpers/jwtAccess')
const { verifyHash } = require('../helpers/bcrypyAccess')

module.exports = {
    googleSignin(req,res,next){
        UserModel.findOne({
            email : req.decoded.email
        })
        .then(user=>{
            let { name, email } = req.decoded
            if(user){
                const token = generate({ id:user._id, email : user.email})
                res.status(200).json({token})
            }
            else {
                return UserModel.create({
                    email,
                    password : process.env.DEFAULT_PASSWORD
                })
            }
        })
        .then(user=>{
            const token = jwt.generate({_id:user._id, email:user.email})
            res.status(200).json({token})
        })
        .catch(next)
    },
    signUp(req,res,next){
        let { email, password } = req.body
        let userCreate = { email, password }
        UserModel.findOne({email})
            .then(user=>{
                if(!user){
                    return UserModel.create(userCreate)
                } else {
                    throw { msg : 'Email has been taken!' }
                }
            })
            .then(user=>{
                const token = generate({ id:user._id, email : user.email})
                req.headers = token
                res.status(200).json({user, token})
            })
            .catch(next)
    },
    signIn(req,res,next){
        let { email, password } = req.body
        UserModel.findOne({ email })
        .then(user=>{
            if(!user) throw { msg : 'LoginFail' }
            else {
                const compare = verifyHash(password,user.password)
                if(compare){

                    const token = generate({ id:user._id, email : user.email})
                    res.status(200).json(token)
                } else {
                    throw { msg : 'Email Or Password Invalid!' }
                }
            }
        })
        .catch(next)
    },
    findUser(req,res,next){
        UserModel.find()
            .then(users=>{
                res.status(200).json(users)
            })
            .catch(next)
    }
}