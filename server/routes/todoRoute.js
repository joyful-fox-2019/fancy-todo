const router = require('express').Router();
const authentication = require('../middleware/authentication')
const todoController = require('../controllers/TodoController.js');

router.get('/:id', authentication, todoController.find);
router.post('/', authentication, todoController.create);
router.put('/:id',authentication, todoController.update);
router.delete('/:id', authentication, todoController.delete);

module.exports = router;
