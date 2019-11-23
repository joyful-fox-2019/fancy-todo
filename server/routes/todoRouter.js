const Route = require('express').Router();
const TodoCont = require('../controllers/todoController');
const {authentication, authorizationTodo, authorizationProjectMember} = require('../middlewares/auth');

Route.use(authentication)
Route.get('/', TodoCont.getTodo) // *
Route.get('/project', TodoCont.getProjectTodo);
Route.post('/', TodoCont.createTodo) // *

Route.post('/project/:id', TodoCont.createTodoForProject); // *

Route.patch('/checklist/:id',TodoCont.checklist);
Route.delete('/project/:id', TodoCont.deleteTodoProject)
Route.put('/project/:id', authorizationProjectMember, TodoCont.updateTodoProject);
Route.put('/:id', authorizationTodo, TodoCont.updateTodo) // *
Route.delete('/:id', authorizationTodo, TodoCont.deleteTodo) // *

//new

module.exports = Route;