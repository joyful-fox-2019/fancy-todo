const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const autho = require('../middlewares/autho')
const todoController = require('../controllers/todoController')

router.get('/', auth,todoController.readAll)
router.post('/', auth,todoController.create)
router.delete('/:todoId', auth, autho,todoController.delete)
router.patch('/:todoId', auth,autho,todoController.updateTodo)
router.patch('/:todoId/status', auth, autho,todoController.updateStatus)
router.get('/:todoId/todo', auth,todoController.readOne)

module.exports = router 