const router = require('express').Router();
const TodoController = require('../controllers/todo');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.post('/', authenticate, TodoController.create);
router.get('/', authenticate, TodoController.showAll);
router.get('/:id', authenticate, TodoController.showOne);
router.put('/:id', authenticate, authorize, TodoController.updateOne);
router.patch('/:id', authenticate, TodoController.updateStatus);
router.delete('/:id', authenticate, TodoController.deleteOne);


module.exports = router;