const User = require('../models/user');
const Project = require('../models/project');
const { OAuth2Client } = require('google-auth-library');

const mongoose = require('mongoose');
const { comparePassword } = require('../helpers/hash');
const { signToken } = require('../helpers/jwt'); 

module.exports = {
  findAllUser (req, res, next) {
    User.find()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(next);
  },
  login (req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if(user && comparePassword(password, user.password)){
          const payload = {
            id: user._id,
            username: user.username,
            email: user.email
          }
          const serverToken = signToken(payload);
          res.status(200).json({ token: serverToken});
        } else {
          throw {msg: 'wmail'}
        }
      })
      .catch(next)
  },
  loginG (req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let username
    let email
    let password = ''
    let serverToken
    client.verifyIdToken({
        idToken : req.body.id_token,
        audience : process.env.GOOGLE_CLIENT_ID
    })
    .then((ticket) => {
        const payload = ticket.getPayload() //get username,email dari google
        const load = {
          username: payload.name,
          email: payload.email
        }
        serverToken = signToken(load);
        username = payload.name;
        email = payload.email;
        for(let i=0; i<5; i++ ) {
          let alfa = 'dafdsagemkempwemepfka';
          let rand = Math.floor(Math.random() * alfa.length);
          password+= alfa[rand];
        }
        return User.findOne({ email })
    })
    .then(user => {
      if(user) {
        res.status(200).json({token: serverToken});
      }else {
        return User.create({ username, password, email })
      }
    })
    .then(() => {
      res.status(200).json({token: serverToken})
    })
    .catch(next)
  },
  register (req, res, next) {
    const { username, password, email } = req.body;
    User.create({ username, password, email })
      .then( () => {
        res.status(201).json({msg: 'success register!'})
      })
      .catch(next)
  },
  responseInvitePositif (req, res, next) {
    const ProjectId = req.params.id;
    User.findByIdAndUpdate({ _id: req.loggedUser.id }, {$pull: {Invitation: ProjectId}})
      .then( () => {
        const userId = new mongoose.Types.ObjectId(req.loggedUser.id);
        return Project.findByIdAndUpdate({ _id: ProjectId }, {$push: {Members: userId}})
      })
      .then( () => {
        res.status(200).json({msg: 'You Accept the Invitation'})
      })
      .catch(next)
  },
  responseInviteNegativ (req, res, next) {
    const ProjectId = req.params.id;
    User.findByIdAndUpdate({ _id: req.loggedUser.id }, {$pull: {Invitation: ProjectId}})
      .then(_ => {
        res.status(200).json({msg: 'Your Denied the Invitation'})
      })
      .catch(next)
  },
  pushInvite (req, res, next) {
    const projectId = req.params.id;
    const { username } = req.body;
    User.findOneAndUpdate({ username }, {$push: {Invitation: projectId}})
      .then( (a) => {
        if(!a) throw {msg: 'zero'}
        else{
          res.status(200).json({msg: 'success invited!'})
        }
      })
      .catch(next)
  },
  getLoginUser (req, res, next) {
    const username = req.loggedUser.username;
    User.findOne({ username }).populate('Invitation')
      .then(user => {
        res.status(200).json(user);
      })
      .catch(next)
  }
}