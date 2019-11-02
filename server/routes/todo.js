const router = require("express").Router();
const TodoController = require("../controllers/todo.js");
const authenticate = require("../middlewares/authenticater.js");
const authorize = require("../middlewares/authorization.js");

router.use(authenticate);
router.get("/", TodoController.findAll);
router.get("/:id", TodoController.findOne);
router.post("/", TodoController.create);
router.put("/:id", authorize, TodoController.update);
router.patch("/:id", authorize, TodoController.patch);
router.delete("/:id", authorize, TodoController.delete);

module.exports = router;