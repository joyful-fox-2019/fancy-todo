const Route = require('express').Router();
const ProjectCont = require('../controllers/projectController');
const { authentication,authorizationProject, authorizationProjectMember } = require('../middlewares/auth');

Route.use(authentication)
Route.get('/', ProjectCont.findAllProject); // *
Route.post('/', ProjectCont.createProject);// *


Route.get('/find/:id', authorizationProjectMember, ProjectCont.findOneProject);

Route.patch('/:id', authorizationProject, ProjectCont.updateNameProject); // *
Route.delete('/:id', authorizationProject, ProjectCont.deleteProject); // *

module.exports = Route;