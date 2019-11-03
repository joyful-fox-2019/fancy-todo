const router = require('express').Router()
const todoController = require('../controllers/todoController')
const isLogin = require('../middlewares/isLogin')
const isAuthorized = require('../middlewares/isAuthorized')

router.use(isLogin)

router.get('/', todoController.displayAll)
router.post('/', todoController.create)
router.post('/:id', todoController.createForProject)
router.put('/:id', isAuthorized, todoController.update)
router.delete('/:id', isAuthorized, todoController.delete)

module.exports = router