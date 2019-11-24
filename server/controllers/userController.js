const User = require('../models/User')
const Todo = require('../models/Todo')
const {hash, compare} = require('../helpers/bcrypt')
const {sign, verify} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const mailjet = require ('node-mailjet')
  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

class UserController {
  static getUser(req, res, next){
    const {_id} = req.loggedUser
    User.findOne({_id})
    .populate('projects_id')
      .then(user=>{
        res.status(200).json(user)
      })
      .catch(next)
  }

  static register(req, res, next){
    const {name, email, password} = req.body
    const hashPassword = hash(password)
    User.create({
      name,
      password: hashPassword,
      email
    })
      .then(user=>{
        res.status(201).json(user)
      })
      .catch(next)
  }

  static login(req, res, next){
    const {email, password} = req.body
    User.findOne({email})
      .then(user=>{
        if(user && compare(password, user.password)){
          const token = sign({
            _id: user._id,
            email
          })

          res.status(200).json({
            token,
            name: user.name
          })
        }
        else{
          throw{
            errors:{
              msg: 'password/email wrong',
              status: 400
            }
          }
        }
      })
      .catch(next)
  }

  static googleOauth(req, res, next){
    const token = req.body.id_token
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    let loggedUser = ''
    client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket=>{
        const payload = ticket.getPayload()
        loggedUser = payload
        return User.findOne({email: payload.email})
      })
      .then(user=>{
        if(user){
          return user
        }
        else{
          const hashedPassword = hash(process.env.DUMMY_PASSWORD)
          return User.create({
            name: loggedUser.given_name,
            email: loggedUser.email,
            password: hashedPassword
          })
        }
      })
      .then(user=>{
        const token = sign({
          _id: user._id,
          email: user.email
        })
        res.status(201).json({
          token,
          name: loggedUser.given_name
        })
      })
      .catch(next)
  }

  static mailer(req, res, next){
    const user = req.loggedUser
    const _id = user._id
    let email = ''
    let name = ''
    User.findOne({_id})
      .then(user=>{
        if(user){
          email = user.email
          name = user.name
          return Todo.find({
            user_id: user._id
          })
        }
        else{
          throw {
            errors: {
              status: 400,
              msg: 'user not found'
            }
          }
        }        
      })
      .then(todos=>{
        let htmlTodo = `
        <h2>Your todo plan</h2>
        <ol>
        `
        todos.forEach(todo=>{
          htmlTodo +=`<li>${todo.title}</li>`
        })
        htmlTodo += '</ol>'
        console.log(htmlTodo)
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "indraswimpsf@gmail.com",
                "Name": "Indra"
              },
              "To": [
                {
                  "Email": `${email}`,
                  "Name": `${name}`
                }
              ],
              "Subject": "Your todo plan",
              "HTMLPart": `${htmlTodo}`
            }
          ]
        })
        request
          .then((result) => {
            res.status(200).json({status: 'success'})
          })
          .catch(next)
      })
      .catch(next)
  }
}

module.exports = UserController