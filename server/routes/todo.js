const routes = require("express").Router();
const TodoController = require("../controllers/todo");

routes.post("/create", TodoController.create);
routes.get("/find", TodoController.findAll);
routes.put("/update", TodoController.update);
routes.delete("/delete", TodoController.delete);



module.exports = routes;