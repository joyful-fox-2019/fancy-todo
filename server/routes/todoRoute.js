const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const { authentication, todoAuth, projectToDoAuth} = require('../middlewares/auth')

router.use(authentication)
router.get('/', TodoController.find)
router.post('/', TodoController.create)
router.get('/:id', todoAuth, TodoController.findById)
router.patch('/:id', todoAuth, TodoController.update)
router.delete('/:id', todoAuth, TodoController.remove)
router.get('/project/:id/:projectId', projectToDoAuth, TodoController.findById)
router.patch('/project/:id/:projectId', projectToDoAuth, TodoController.update)
router.delete('/project/:id/:projectId', projectToDoAuth, TodoController.remove)

module.exports = router