const router = require('express').Router()
const todo = require('./todoRoute')
const user = require('./userRoute')

router.use('/todos', todo)
router.use('/', user)


module.exports = router