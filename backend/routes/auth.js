const { Router } = require("express");
const { SignUp, SignIn, getMe } = require("../controllers/auth");
const router = Router();
const { Protected } = require("../middlewares/auth");

router.route("/signup").post(SignUp);
router.route("/signin").post(SignIn);
router.route("/me").get(Protected, getMe);
module.exports = router;
