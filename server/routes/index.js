const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')

router.use('/',userRouter)
router.use('/todo',todoRouter)


module.exports = router