const router = require('express').Router()
const TodoController = require('../controllers/todo')

router.get('/:token',TodoController.showAll)
router.post('/',TodoController.create)
router.delete('/:id/:token',TodoController.delete)
router.put('/:id',TodoController.update)
router.patch('/:id',TodoController.statusUpdate)


module.exports = router