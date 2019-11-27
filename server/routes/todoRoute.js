const router = require('express').Router()
const TodoController = require('../controllers/todo')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', TodoController.find)
router.post('/', TodoController.addTask)
router.delete('/:id', authorization, TodoController.delete)
router.patch('/:id', authorization, TodoController.updateField)

module.exports = router