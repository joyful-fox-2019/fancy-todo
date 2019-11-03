const router = require('express').Router()
const todoController = require('../controllers/todoCon')
const userController = require('../controllers/userCon')
const googleVerify = require('../middlewares/googleVerify')
const { authentication, authorization } = require('../middlewares/auth')


router.post('/register', userController.register)
router.post('/googleSignIn', googleVerify, userController.googleSignIn)
router.post('/login', userController.login)

router.use(authentication)
router.get('/', todoController.showAll)
router.post('/', todoController.add)

router.get('/:id', authorization, todoController.showById)
router.put('/:id', authorization, todoController.updateStatus)
router.delete('/:id', authorization, todoController.delete)


module.exports = router

