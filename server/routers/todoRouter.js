const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const {authentication,authorizationForTheirTodo} = require('../middleware/auth')

router.use(authentication)
router.get('/', TodoController.listTodo)
router.get('/:_id', authorizationForTheirTodo, TodoController.findTodo)
router.post('/', TodoController.createTodo)
router.patch('/:_id', authorizationForTheirTodo, TodoController.updateTodo)
router.delete('/:_id', authorizationForTheirTodo, TodoController.removeTodo)

module.exports = router