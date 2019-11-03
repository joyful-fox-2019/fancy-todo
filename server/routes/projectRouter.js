const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')
const {authentication,authorizationOwner,authorizationMember} = require('../middlewares/auth')

router.use(authentication)

router.get('/',ProjectController.findAll)
router.get('/:id',ProjectController.findOne)
router.post('/',ProjectController.create)

router.patch('/:id',authorizationOwner,ProjectController.addMember)
router.delete('/:id',authorizationOwner,ProjectController.deleteProject)

router.use('/:id/todos',authorizationMember)
router.patch('/:id/todos',authorizationMember,ProjectController.addTodos)
router.delete('/:id/todos/:todoId',authorizationMember,ProjectController.deleteTodos)
router.patch('/:id/todos/:todoId',authorizationMember,ProjectController.updateTodos)
router.patch('/:id/todos/:todoId/status',authorizationMember,ProjectController.changeStatus)

module.exports = router