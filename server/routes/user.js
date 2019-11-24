const router = require("express").Router();
const UserController = require("../controllers/user.js");
const googleVerify = require("../middlewares/googleVerifier.js");

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.post("/signin-google", googleVerify, UserController.googleSignIn);

module.exports = router;