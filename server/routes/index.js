const router = require('express').Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const projectRouter = require('./projectRouter')
const simiRouter = require('./simiRouter')

router.get('/',(req,res)=>{res.json({message:'welcome to fancy-todo'})})
router.use('/users',userRouter)
router.use('/todos',todoRouter)
router.use('/projects',projectRouter)
router.use('/chat',simiRouter)

module.exports = router