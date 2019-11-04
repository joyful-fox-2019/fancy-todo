const router = require('express').Router()
const TodoController = require('../controllers/todo')
const { authentication, todoAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', TodoController.create)
router.get('/', TodoController.get)
router.get('/:id', todoAuthorization, TodoController.findOne)
router.patch('/:id', todoAuthorization, TodoController.update)
// router.patch('/:id/add', TodoController.addMember)
router.delete('/:id', todoAuthorization, TodoController.delete)

module.exports = router
