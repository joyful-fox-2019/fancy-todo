const router = require('express').Router()
const ToDoController = require('../controllers/ToDoController')
const authentication = require('../middlewares/authentication')
const { ToDoAuthorization } = require('../middlewares/authorization')

router.use(authentication)
router.post('/', ToDoController.create)
router.get('/', ToDoController.findAll)
router.patch('/status/:id', ToDoAuthorization, ToDoController.updateStatus)
router.delete('/:id', ToDoAuthorization, ToDoController.delete)
router.patch('/:id', ToDoAuthorization, ToDoController.updateToDo)
router.get('/:id', ToDoAuthorization, ToDoController.findOne)
router.get('/search/:title', ToDoController.searchToDo)

module.exports = router