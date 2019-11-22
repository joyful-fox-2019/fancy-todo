const router = require("express").Router()
const UserController = require("../controllers/userController")

router.post('/', UserController.login)

module.exports = router