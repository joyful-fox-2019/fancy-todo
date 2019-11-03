const router = require('express').Router()
const todoController = require('../controllers/todoController')
const authenticate = require('../middlewares/authenticate.js')

router.use(authenticate)
router.post('/',todoController.create)
router.get('/',todoController.findAll)
router.get('/:todoId',todoController.findOne)
router.delete('/:todoId',todoController.destroy)
router.put('/:todoId', todoController.update)




module.exports = router