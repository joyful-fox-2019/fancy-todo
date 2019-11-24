const router = require('express').Router()
const ApisController = require('../controllers/ApisController')

router.get('/news', ApisController.news)

module.exports = router