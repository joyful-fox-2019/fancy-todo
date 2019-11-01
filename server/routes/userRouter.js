const Route = require('express').Router();
const userCont = require('../controllers/userController');
const {authentication, authorizationAcceptInvite} = require('../middlewares/auth');


 // find all user for invite
Route.get('/', authentication, userCont.findAllUser) // *

Route.get('/getlogin', authentication, userCont.getLoginUser);

 // login normal
Route.post('/signin', userCont.login) // *
Route.post('/signinG', userCont.loginG);

 // register
Route.post('/signup', userCont.register) // *

// response invite patch splice invitation , id -> ProjectId
Route.patch('/acc/:id', authentication, authorizationAcceptInvite, userCont.responseInvitePositif); // * 
Route.patch('/dec/:id', authentication, authorizationAcceptInvite, userCont.responseInviteNegativ);

//ngepush invitean yang masuk id->ProjectId
Route.patch('/coming/:id', authentication, userCont.pushInvite) //*


module.exports = Route;