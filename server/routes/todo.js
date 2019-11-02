const router = require('express').Router()
const TodoController = require('../controllers/todo')

router.get('/',TodoController.showAll)
router.post('/',TodoController.create)
router.delete('/:id',TodoController.delete)
router.put('/:id',TodoController.update)
router.patch('/:id',TodoController.statusUpdate)


module.exports = router