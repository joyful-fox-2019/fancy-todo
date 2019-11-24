const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const auth = require('../middlewares/auth')
const authProject = require('../middlewares/authoProject')
const autho = require('../middlewares/autho')

router.get('/', auth,authProject,projectController.readAll)
router.post('/', auth,authProject,projectController.create)
router.patch('/', auth,authProject,projectController.updateMember)
router.patch('/:projectId', auth,authProject,projectController.addTodo)


module.exports = router 