const router = require('express').Router()
const todoController = require('../controllers/todo')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', todoController.findAll)
router.post('/', todoController.create)
router.use('/:id', authorization)
router.get('/:id', todoController.findOne)
router.delete('/:id', todoController.delete) 
router.put('/:id', todoController.updateAll)


module.exports = router