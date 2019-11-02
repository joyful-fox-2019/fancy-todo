const router = require('express').Router()
const TodoController = require('../controllers/todo')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.get('/',TodoController.showAll)
router.post('/',TodoController.create)


router.use('/:id',authorization)
router.delete('/:id',TodoController.delete)
router.put('/:id',TodoController.update)
router.patch('/:id',TodoController.statusUpdate)


module.exports = router