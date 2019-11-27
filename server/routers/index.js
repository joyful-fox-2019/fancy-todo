const router = require('express').Router()
const usersRouter = require('./users')
const tasksRouter = require('./tasks')
const projectsRouter = require('./projects')
const { authentication } = require('../middlewares/auth')

router.get('/', (req, res, next) => {
  res.status(200).json({ hello: 'welcome to CheckIt' })
})

router.use('/users', usersRouter)
router.use(authentication)
router.use('/tasks', tasksRouter)
router.use('/projects', projectsRouter)

module.exports = router