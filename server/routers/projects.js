const router = require('express').Router()
const ProjectController = require('../controllers/project')
const { projectAuthorization } = require('../middlewares/auth')
const cascade = require('../middlewares/cascadeProject')

router.get('/', ProjectController.find)
router.get('/:id', ProjectController.findOne)
router.post('/', ProjectController.add)
router.use('/:id', projectAuthorization)
router.patch('/:id', ProjectController.update)
router.delete('/:id', ProjectController.delete, cascade)

module.exports = router