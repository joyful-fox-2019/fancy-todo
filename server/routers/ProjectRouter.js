const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')
const authentication = require('../middlewares/authentication')
const { OwnerAuthorization} = require('../middlewares/authorization')

router.use(authentication)
router.post('/', ProjectController.createProject)
router.post('/addMember', OwnerAuthorization, ProjectController.addMember)
router.get('/', ProjectController.findProject)
router.delete('/:id', OwnerAuthorization, ProjectController.deleteProject)
router.post('/addMember/:id', OwnerAuthorization, ProjectController.addMember)
router.post('/ToDo', ProjectController.createToDo)
router.get('/ToDo/:id', ProjectController.findAllToDo)
router.patch('/ToDo/status/:ToDoId', ProjectController.updateToDoStatus)
router.patch('/ToDo/:ToDoId', ProjectController.updateToDoAll)
router.get('/ToDo/get/:ToDoId', ProjectController.findOneToDo)
router.delete('/ToDo/:ToDoId', ProjectController.deleteToDo)

module.exports = router