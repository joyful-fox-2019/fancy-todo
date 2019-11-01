const router = require('express').Router()
const usersRouter = require('./users')
const tasksRouter = require('./tasks')

router.get('/', (req, res, next) => {
  res.status(200).json({ hello: 'welcome to CheckIt' })
})

router.use('/users', usersRouter)
router.use('/tasks', tasksRouter)

module.exports = router