const router = require("express").Router()
const UserController = require('../controllers/user')

router.get('/',UserController.showAll)
router.post('/',UserController.register)
router.delete('/:id',UserController.delete)
router.post('/:id',UserController.signin)

module.exports=router
