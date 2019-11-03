const routes = require("express").Router();
const TodoController = require("../controllers/todo");

routes.post("/create", TodoController.create);
routes.post("/find", TodoController.findAll);
routes.put("/update", TodoController.update);
routes.delete("/delete", TodoController.delete);
routes.post("/findById", TodoController.findById)
routes.put("/selected", TodoController.selected);



module.exports = routes;