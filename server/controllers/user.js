const User = require('../models/user')
const hash = require('../helpers/hash')
const googleVerify = require('../helpers/googleVerify')
const JWT = require('../helpers/JWT')

class ControllerUser {
  static register(req, res, next) {
    console.log("ControllerUser.register");
    
    let { name, email, password } = req.body
    User
      .create({
        name, email, password
      })
      .then(user => {
        const token = JWT.generateToken(email)
        res.status(200).json({ user, token })
      })
      .catch(next)
  }

  static login(req, res, next) {
    let { email, password } = req.body
    User
      .findOne({ email })
      .then(user => {
        let passwordMatch = null

        if (user) {
          passwordMatch = hash.verifyHash(password, user.password)

          if (passwordMatch) {
            const token = JWT.generateToken(email)
            res.status(200).json({ token })
          }
        }
        if (!user || !passwordMatch) {
          throw {
            name: 'BadRequest',
            status: 400,
            message: 'Wrong email/password!'
          }
        }
      })
      .catch(next)
  }

  static googleSignIn(req, res, next) {
    let { googleIdToken } = req.body
    let userTicket = {}

    googleVerify(googleIdToken)
      .then(ticket => {

        userTicket = ticket.payload

        // Check whether the email already exists in the database
        // If not, register
        // If yes, login successfully

        return User.findOne({
          email: userTicket.email
        })
      })
      .then(user => {

        if (user) {
          const token = JWT.generateToken(userTicket.email)

          console.log("ini token pas ketemu user", token);
          return res.status(200).json({ token })
        }
        else {
          console.log('Register the user first');
          return User.create({
            name: userTicket.name,
            email: userTicket.email,
            password: process.env.DEFAULT_USER_PASSWORD
          })
            .then(() => {
              const token = JWT.generateToken(userTicket.email)

              console.log("ini token pas create user", token);

              return res.status(200).json({ token })
            })
        }
      })
      .catch(next)
  }
}

module.exports = ControllerUser