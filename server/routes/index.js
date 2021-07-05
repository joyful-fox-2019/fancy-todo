const router = require('express').Router()
const user = require('./user')
const todos = require('./todos')
const project = require('./project')

router.use('/users', user)
router.use('/todos', todos)
router.use('/project', project)

module.exports = router