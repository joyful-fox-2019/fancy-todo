const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const {authentication, todoAuthorization, projectAuthentication} = require('../middlewares/authentication')

router.use(authentication)

router.get('/', TodoController.getTodos)
router.get('/project/:project', projectAuthentication, TodoController.getTodosProject)

router.post('/', TodoController.crateTodo)
router.post('/project/:project', projectAuthentication, TodoController.createTodoProject)

router.put('/:id', todoAuthorization, TodoController.editTodo)
router.put('/:project/:id', projectAuthentication, TodoController.editTodo)

router.patch('/:id/done', todoAuthorization, TodoController.doneTodo)
router.patch('/:id/undone', todoAuthorization, TodoController.undoneTodo)
router.patch('/:project/:id/done', projectAuthentication, TodoController.doneTodo)
router.patch('/:project/:id/undone', projectAuthentication, TodoController.undoneTodo)

router.delete('/:id', todoAuthorization, TodoController.deleteTodo)
router.delete('/:project/:id', projectAuthentication, TodoController.deleteTodo)

module.exports = router