const router = require('express').Router()
const userRoute = require('./user')
const todoRouter = require('./todo')
const quoteGardenRoute = require('./quoteGarden')

router.use('/users', userRoute)
router.use('/todos', todoRouter)
router.use('/quote', quoteGardenRoute)

module.exports = router