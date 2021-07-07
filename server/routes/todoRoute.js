const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const authorization = require('../middlewares/authorization');
const TodoController = require('../controllers/todoController');

router.use(authenticate);

router.post('/', TodoController.create);
router.get('/', TodoController.getAll);
router.patch('/:id', authorization, TodoController.done);
router.delete('/:id', authorization, TodoController.delete)

module.exports = router;