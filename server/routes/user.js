const router = require("express").Router()
const UserController = require('../controllers/user')

router.get('/',UserController.showAll)
router.post('/register',UserController.register)
router.delete('/:id',UserController.delete)
router.post('/signin',UserController.signin)
router.post('/google',UserController.signinGoogle)

module.exports=router
