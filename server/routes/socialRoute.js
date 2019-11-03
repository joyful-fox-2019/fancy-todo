const router = require('express').Router()
const SocialController = require('../controllers/SocialController')
const { authentication, authorization } = require('../middleware/auth')

router.use(authentication)
router.post('/:id', authorization, SocialController.create)
router.get('/', SocialController.find)
router.patch('/:id/upvote', SocialController.upvote)
router.patch('/:id/downvote', SocialController.downvote)
router.delete('/:id', authorization, SocialController.delete)

module.exports = router