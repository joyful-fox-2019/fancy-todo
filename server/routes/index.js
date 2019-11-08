const express = require('express');
const router = express.Router();
const taskRoute = require('./taskRoute');
const userRoute = require('./userRoute');
const apiRoute = require('./apiRoute')

router.use('/task', taskRoute)
router.use('/user', userRoute)
router.use('/api', apiRoute)

module.exports = router;