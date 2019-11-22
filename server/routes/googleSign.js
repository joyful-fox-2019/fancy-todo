const router = require("express").Router()
const UserController = require("../controllers/userController")

router.post('/', UserController.gsign)

module.exports = router