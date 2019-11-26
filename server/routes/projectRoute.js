const router = require('express').Router()
const ProjectController = require('../controllers/projectController')
const {authentication, projectAuth} = require('../middlewares/auth')

router.use(authentication)
router.get('/', ProjectController.find)
router.post('/', ProjectController.create)
router.get('/:id', projectAuth, ProjectController.findById)
router.patch('/:id', projectAuth, ProjectController.update)
router.delete('/:id', projectAuth, ProjectController.remove)

module.exports = router
