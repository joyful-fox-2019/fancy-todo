const router = require('express').Router()
const projectController = require('../controllers/projectController')
const isLogin = require('../middlewares/isLogin')
const isProjectAuthorized = require('../middlewares/isProjectAuthorized')

router.get('/', isLogin, projectController.displayAll)
router.get('/todos/:id', isLogin, projectController.displayTodos)
router.get('/members/:id', isLogin, projectController.displayUsers)
router.get('/members/invite/:id', projectController.displayUsersToInvite)
router.patch('/members/:id', isLogin, isProjectAuthorized, projectController.removeUser)
router.post('/', isLogin, projectController.create)
router.patch('/:id', projectController.update)
router.delete('/:id', projectController.delete)

module.exports = router
