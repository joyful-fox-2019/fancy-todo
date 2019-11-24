const router = require('express').Router()
const userRoute = require('./userRoute')
const todoRoute = require('./todoRoute')
const projectRoute = require('./projectRoute')
const socialRoute = require('./socialRoute')
const apiRouter = require('./apisRoute')

router.use('/users', userRoute)
router.use('/todos', todoRoute)
router.use('/projects', projectRoute)
router.use('/socials', socialRoute)
router.use('/apis', apiRouter)

module.exports = router