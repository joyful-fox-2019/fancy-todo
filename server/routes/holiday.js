const express = require("express")
const router = express.Router()
const {authentication} = require('../middlewares/auth')
const HolidayController = require("../controllers/holidayController")

router.get('/', authentication, HolidayController.getHoliday)
router.post('/', authentication, HolidayController.searchHoliday)

module.exports = router