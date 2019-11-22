const router = require("express").Router()
const {authentication, authorization} = require("../middlewares/auth")

const TodoController = require("../controllers/todoController")
router.get('/', authentication, TodoController.allTodo)
router.get('/:id', authentication, TodoController.findOneTodo)
router.post('/', authentication, TodoController.addTodo)
router.delete('/:id',authentication, authorization,TodoController.deleteTodo)
router.put('/:id', authentication, authorization,TodoController.updateTodo)
router.patch('/:id', authentication, authorization,TodoController.statusTodo)

module.exports = router
