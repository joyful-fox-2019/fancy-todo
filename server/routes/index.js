const router = require('express').Router()
const userRoutes = require('./userRoutes')
const todoRoutes = require('./todoRoutes')
const projectRoutes = require('./projectRoutes')

router.use('/',userRoutes)
router.use('/todo',todoRoutes)
router.use('/project',projectRoutes)

module.exports = router