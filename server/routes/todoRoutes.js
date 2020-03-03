const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const {authentication, authorizationTodo} = require('../middlewares/auth')

router.use(authentication)

router.post('/', TodoController.create)
router.get('/', TodoController.readAll)

router.use('/:id', authorizationTodo)

router.get('/:id', TodoController.readOne)
router.put('/:id', TodoController.updateAll)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.delete)

module.exports = router