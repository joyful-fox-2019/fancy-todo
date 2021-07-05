const router = require('express').Router()
const TodoController = require('../controllers/todos')
const { authentication, authorization } = require('../middleware/auth')

router.use(authentication)

router.post('/', TodoController.create)
router.get('/', TodoController.findAll)
router.get('/today', TodoController.getToday)
router.get('/search/:title', TodoController.search)
router.get('/:id', TodoController.findOne)

router.use('/:id', authorization)
router.delete('/:id/delete', TodoController.detele)
router.patch('/:id/update', TodoController.update)

module.exports = router