const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.use('/', authenticate)
router.post('/', taskController.add)
router.get('/', taskController.list)
router.use('/:id', authorize)
router.get('/:id', taskController.detail)
router.put('/:id', taskController.update)
router.patch('/:id', taskController.undo)
router.delete('/:id', taskController.delete)

module.exports = router;