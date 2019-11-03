const router = require('express').Router()
const userRoute = require('./user')
const todoRouter = require('./todo')

router.use('/users', userRoute)
router.use('/todos', todoRouter)

module.exports = router