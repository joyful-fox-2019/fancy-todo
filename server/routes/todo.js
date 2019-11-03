const router = require('express').Router();
const Todo = require('../controllers/todoController');
const {
    authentication,
    authorization
} = require('../middleware/auth');

router.use(authentication);
router.post('/', Todo.create);
router.get('/', Todo.read);
//need author
router.delete('/:id', authorization, Todo.delete);
router.patch('/:id', authorization, Todo.updateMark);
router.put('/:id', authorization, Todo.updateData);
router.get('/:id', authorization, Todo.findOne);
module.exports = router;