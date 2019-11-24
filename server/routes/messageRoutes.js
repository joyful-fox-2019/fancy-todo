const router = require('express').Router()
const messageController = require('../controllers/messageController')
const isLogin = require('../middlewares/isLogin')

router.post('/:id', isLogin, messageController.create)
router.delete('/:id', isLogin, messageController.delete)

module.exports = router