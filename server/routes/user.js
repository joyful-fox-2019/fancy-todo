const router = require("express").Router()

const UserController = require("../controllers/userController")
const {authentication, authorizationGroup, authorizationEditTodoGroup} = require('../middlewares/auth')

router.get('/', authentication, UserController.seeGroup)
router.get('/:id', authentication, UserController.seeOneGroup)
router.post('/', authentication, UserController.createGroup)
router.patch('/member/:id', authentication, authorizationGroup, UserController.addMember)
router.patch('/projectTodo/:id', authentication, authorizationGroup, UserController.addTodoProject)
router.patch('/editProject/:id', authentication, authorizationEditTodoGroup, UserController.editProject)
router.patch('/statusProject/:id', authentication, authorizationEditTodoGroup, UserController.statusProject)
router.delete('/projectTodo/:id', authentication, authorizationEditTodoGroup, UserController.deleteTodoProject)
router.delete('/:id', authentication, UserController.deleteGroup)


module.exports = router