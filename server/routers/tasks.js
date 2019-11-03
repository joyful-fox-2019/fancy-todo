const router = require('express').Router()
const TaskController = require('../controllers/task')
const { taskAuthorization } = require('../middlewares/auth')

router.get('/', TaskController.find)
router.get('/:id', TaskController.findOne)
router.post('/', TaskController.add)
router.use('/:id', taskAuthorization)
router.patch('/:id', TaskController.update)
router.delete('/:id', TaskController.delete)

module.exports = router