var express = require("express");
var router = express.Router();
const userController = require("../controller/user.Controller");
const authController = require("../controller/autologin");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", userController.signUp);
router.post("/login", authController.userlogin);
router.get("/roomView", userController.roomView);
router.get("/roomviewsingle/:id", userController.roomViewSingle);

module.exports = router;
