const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authentication, authorization } = require('../middleware/auth')

router.get('/', authentication, TodoController.find)
router.post('/', authentication, TodoController.create)
router.get('/:id', authentication, authorization, TodoController.findById)
router.patch('/:id', authentication, authorization, TodoController.update)
router.delete('/:id', authentication, authorization, TodoController.delete)

module.exports = router