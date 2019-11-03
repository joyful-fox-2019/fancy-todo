const router = require('express').Router()
const todoController = require('../controllers/todoController')
const authenticate = require('../middlewares/authenticate.js')
const authorize = require('../middlewares/authorize')

router.use(authenticate)
router.post('/',todoController.create)
router.get('/',todoController.findAllToday)
router.get('/all',todoController.findAll)
router.get('/:todoId',todoController.findOne)
router.delete('/:todoId',authorize,todoController.destroy)
router.put('/:todoId',authorize, todoController.update)




module.exports = router