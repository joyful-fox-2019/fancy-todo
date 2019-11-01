const Route = require('express').Router();
const TodoCont = require('../controllers/todoController');
const {authentication, authorizationTodo} = require('../middlewares/auth');

Route.use(authentication)
Route.get('/', TodoCont.getTodo) // *
Route.get('/project', TodoCont.getProjectTodo);
Route.post('/', TodoCont.createTodo) // *

Route.post('/project/:id', TodoCont.createTodoForProject); // *

Route.put('/:id', authorizationTodo, TodoCont.updateTodo) // *
Route.delete('/:id', authorizationTodo, TodoCont.deleteTodo) // *
Route.delete('/project/:id', authorizationTodo, TodoCont.deleteTodoProject)

//new
Route.patch('/checklist/:id', authorizationTodo, TodoCont.checklist);

module.exports = Route;