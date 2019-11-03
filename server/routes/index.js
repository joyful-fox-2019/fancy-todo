const router = require('express').Router()
const userRouter = require('./userRoute')
const todoRouter = require('./todoRoute')
const projectRouter = require('./projectRoute')

router.use('/users', userRouter)
router.use('/todos', todoRouter)
router.use('/projects', projectRouter)

module.exports = router