const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')
const {authentication, authorizationMember, authorizationOwner} = require('../middlewares/auth')

router.use(authentication)

router.get('/', ProjectController.findAll)
router.get('/:id', ProjectController.findOne)
router.post('/', ProjectController.create)

router.patch('/:id/add', authorizationOwner, ProjectController.addMember)
// router.patch('/:id/remove', authorizationOwner, ProjectController.removeMember)
// router.delete('/:id', authorizationOwner, ProjectController.deleteProject)

router.use('/:id/todos', authorizationMember)

// router.patch('/:id/todos', ProjectController.addTodo)
// router.patch('/:id/todos/:todoId', ProjectController.updateTodos)
// router.delete('/:id/todos/:todoId', ProjectController.deleteTodos)

module.exports = router