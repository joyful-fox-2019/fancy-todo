const router = require('express').Router()
const userController = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')

router.use('/register', userController.register)
router.use('/login', userController.login)
router.post('/gsignin', userController.googleLogin)
router.patch('/invite/:id', isLogin, userController.invite)
router.get('/notifications', isLogin, userController.displayNotifications)
router.patch('/accept', isLogin, userController.acceptInvitation)
router.patch('/decline', isLogin, userController.declineInvitation)
router.get('/', isLogin, userController.getUsersToFollow)
router.get('/following', isLogin, userController.getFollowing)
router.get('/followers', isLogin, userController.getFollowers)
router.patch('/follow/:id', isLogin, userController.follow)
router.patch('/unfollow/:id', isLogin, userController.unfollow)
router.get('/inbox', isLogin, userController.getInbox)

module.exports = router