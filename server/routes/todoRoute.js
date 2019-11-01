const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')

router.use(authentication)

router.get('/', TodoController.getTodos)
router.post('/', TodoController.crateTodo)

module.exports = router