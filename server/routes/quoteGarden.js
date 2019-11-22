const router = require('express').Router()
const QuoteGardenController = require('../controllers/QuoteGardenController')
const { authentication } = require('../middlewares/auth')

router.get('/', authentication, QuoteGardenController.get)

module.exports = router