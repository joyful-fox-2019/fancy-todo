const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authentication,authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/',TodoController.create)
router.get('/',TodoController.findAll)

router.use('/:id',authorization)
router.get('/:id',TodoController.findOne)
router.put('/:id',TodoController.update)
router.patch('/:id',TodoController.changeStatus)
router.delete('/:id',TodoController.delete)



module.exports = router