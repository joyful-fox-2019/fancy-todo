const router = require("express").Router()
const todoRoutes = require("./todo")
const holidayRoutes = require("./holiday")
const registerRoutes = require("./register")
const loginRoutes = require("./login")
const googleSign = require("./googleSign")
const userRoutes = require("./user")

router.use('/users', userRoutes)
router.use('/todos',todoRoutes)
router.use('/holidays',holidayRoutes)
router.use('/register', registerRoutes)
router.use('/login', loginRoutes)
router.use('/googleSign', googleSign)

module.exports = router