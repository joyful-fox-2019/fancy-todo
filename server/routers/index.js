const router = require('express').Router()
const UserRouter = require('./UserRouter')
const ProjectRouter = require('./ProjectRouter')
const ToDoRouter = require('./ToDoRouter')

router.use('/', UserRouter)
router.use('/ToDo', ToDoRouter)
router.use('/Project', ProjectRouter)

module.exports = router