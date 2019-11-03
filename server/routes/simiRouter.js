const router = require('express').Router()
const SimiController = require('../controllers/SimiController')


router.post('/', SimiController.chat)


module.exports = router