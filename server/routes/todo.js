const router = require('express').Router();
const TodoController = require('../controllers/todoController')
const Authenticate = require('../middlewares/authenticate');
const Authorization = require('../middlewares/authorization');

// create
router.post('/', Authenticate, TodoController.addTodo)

// read
router.get('/', Authenticate, TodoController.showTodo)

// findOne
router.get('/:id', Authenticate, Authorization, TodoController.findOne)

// get pending
router.get('/pending', Authenticate, TodoController.getPending)

//get Complete
router.get('/complete', Authenticate, TodoController.getComplete)

// update
router.put('/:id', Authenticate, Authorization, TodoController.editTodo)

// delete
router.delete('/:id', Authenticate, Authorization, TodoController.deleteTodo)

module.exports = router