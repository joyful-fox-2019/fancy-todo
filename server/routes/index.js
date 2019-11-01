const router = require('express').Router()
const userRouter = require('./userRoute')
const todoRouter = require('./todoRoute')

router.use('/users', userRouter)
router.use('/todos', todoRouter)

module.exports = router