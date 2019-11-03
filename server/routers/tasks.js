const router = require('express').Router()
const TaskController = require('../controllers/task')
const { taskAuthorization } = require('../middlewares/auth')
const cascade = require('../middlewares/cascadeTask')

router.get('/', TaskController.find)
router.get('/:id', TaskController.findOne)
router.post('/', TaskController.add)
router.post('/:projectId', TaskController.addOnProject)
router.use('/:id', taskAuthorization)
router.patch('/:id', TaskController.update)
router.delete('/:id', TaskController.delete, cascade)

module.exports = router