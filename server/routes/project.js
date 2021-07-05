const router = require('express').Router()
const ProjectController = require('../controllers/project')
const { authentication, authProject, authMember } = require('../middleware/auth')

router.use(authentication)
router.get('/', ProjectController.getAll)
router.post('/create', ProjectController.createProject)
router.get('/:projectId', ProjectController.findOne)

router.delete('/:projectId/delete', authProject, ProjectController.deleteProject)
router.post('/:projectId/addMember', authProject, ProjectController.addMember)
router.delete('/:projectId/:userId/delete', authProject, ProjectController.deleteMember)

router.use('/:projectId', authMember)
router.delete('/:projectId/leaveProject', ProjectController.leaveProject)
router.post('/:projectId/addTodo', ProjectController.addTodo)
router.patch('/:projectId/:todoId/update', ProjectController.updateTodo)
router.get('/:projectId/todos', ProjectController.getTodoProject)
router.get('/:projectId/:title/search', ProjectController.search)
router.delete('/:projectId/:todoId/deleteTodo', ProjectController.deleteTodo)

module.exports = router