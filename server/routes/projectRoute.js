const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')
const { authentication, authorizationProject, authorizationMember } = require('../middleware/auth')

router.get('/', authentication, ProjectController.find)
router.post('/', authentication, ProjectController.create)
router.get('/:id', authentication, authorizationProject, ProjectController.findOne)
router.delete('/:id', authentication, authorizationProject, ProjectController.deleteOne)
router.patch('/:id', authentication, authorizationProject, ProjectController.update)
router.patch('/:id/addmember', authentication, authorizationProject, authorizationMember, ProjectController.addMember)
router.patch('/:id/removemember', authentication, authorizationProject, authorizationMember, ProjectController.removeMember)
router.patch('/:id/addtodo', authentication, authorizationProject, ProjectController.addTodo)
router.patch('/:id/updatetodo', authentication, authorizationProject, ProjectController.updateTodo)
router.patch('/:id/removetodo', authentication, authorizationProject, ProjectController.removeTodo)

module.exports = router