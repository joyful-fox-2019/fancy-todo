const express = require('express');
const router = express.Router();
const taskRoute = require('./taskRoute');
const userRoute = require('./userRoute');

router.use('/task', taskRoute)
router.use('/user', userRoute)

module.exports = router;