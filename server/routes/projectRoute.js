const router = require('express').Router()
const ProjectController = require('../controllers/projectController')
const {authentication, projectAuthentication} = require('../middlewares/authentication')

router.use(authentication)

router.get('/', ProjectController.getProjects)
router.get('/:project', projectAuthentication, ProjectController.getOneProject)

router.post('/', ProjectController.createProject)

router.patch('/invite/:project', projectAuthentication, ProjectController.invite)
router.patch('/kick/:project', projectAuthentication, ProjectController.kick)

module.exports = router