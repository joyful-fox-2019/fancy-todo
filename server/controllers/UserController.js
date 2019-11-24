const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const bcrypt = require('../helpers/bcrypt.js');

class UserController {
    static googleSignIn(req, res) {
        let googleUser;
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(( ticket ) => {
            googleUser = ticket.payload;
            return User.findOne({ email : googleUser.email });
        })
        .then(( user )=> {
            if ( user ) {
                let payload = {
                    id: user._id,
                    email: user.email,
                    password: 'defaultPasswordBuatBuat'
                }
                let token = jwt.sign(payload, process.env.JWT_SECRET)
                res.status(200).json({
                    message: 'Google Sign In Successful',
                    token: token,
                    userDetails : user
                })
            } else {
                User.create({
                    firstName: googleUser.given_name,
                    lastName: googleUser.family_name,
                    email: googleUser.email,
                    password: 'defaultPasswordBuatBuat'
                })
                .then(() => {
                    let token = jwt.sign({
                        id: googleUser.id,
                        email: googleUser.email
                    }, process.env.JWT_SECRET)
                    res.status(201).json({
                        message: 'Successfully register new google user and sign-in',
                        token: token,
                        userDetails : googleUser
                    })
                })
            }
        })
        .catch(( err ) => {       
            res.status(500).json({ message: err.message })
        })
    }

    static login(req, res) {
        let user = ''
        User.findOne({ email : req.body.email })
        .then(( user ) => {
            if ( user ) {
                let compareResult = bcrypt.comparePassword(req.body.password, user.password)
                if ( !compareResult ) {
                    res.status(500).json({ message : 'Password is incorrect' })
                } else {
                    let payload = {
                        id : user._id,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.JWT_SECRET)
                    res.status(200).json({ message : 'Sign In Successful', token: token, userDetails: user })
                }
            } else {
                res.status(404).json({ message : `please login/register to continue`})
            }
        })
    }

    static register(req, res) {   
        User.create(req.body)
        .then(()=> {
            res.status(201).json({ message: 'Successfully register new user. Please Sign In later' })
        })
        .catch((err)=> {
            res.status(500).json({ message : err.message})
        })
    }
}

module.exports = UserController