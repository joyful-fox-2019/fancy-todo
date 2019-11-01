const router = require('express').Router()
const TaskController = require('../controllers/task')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', TaskController.find)
router.post('/', TaskController.add)
router.use('/:id', authorization)
router.patch('/:id', TaskController.update)
router.patch('/:id/status', TaskController.check)

module.exports = router