const router = require("express").Router();
const userRoute = require("./user.js");
const todoRoute = require("./todo.js");

router.use("/users", userRoute);
router.use("/todos", todoRoute);

module.exports = router;