const router = require('express').Router()
const todoController = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
//read all todo
router.get('/', todoController.findAll)
//create
router.post('/', todoController.create)
//update
router.put('/:id', authorization, todoController.update)
//delete
router.delete('/:id', authorization, todoController.delete)


module.exports = router