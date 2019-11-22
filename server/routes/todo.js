const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', TodoController.make)
router.get('/', TodoController.readAll)
router.get('/:id', TodoController.readOne)

router.use('/:id', authorization)
router.delete('/:id', TodoController.deleteTodo)
router.put('/:id', TodoController.updateField)

module.exports = router