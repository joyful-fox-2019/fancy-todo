const router = require('express').Router()
const ProjectController = require('../controllers/project')
const { projectAuthorization } = require('../middlewares/auth')

router.get('/', ProjectController.find)
router.post('/', ProjectController.add)
router.use('/:id', projectAuthorization)
router.patch('/:id', ProjectController.update)
router.delete('/:id', ProjectController.delete)

module.exports = router