const routes = require('express').Router()
const todoRoutes = require('./todo')
const userRoutes = require('./user')

routes.get('/',(req,res,next)=>{
    res.status(200).json('HELLO FROM ROUTES')
})

routes.use('/todos',todoRoutes)
routes.use('/user',userRoutes)

module.exports = routes