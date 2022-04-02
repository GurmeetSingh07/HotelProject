var express = require("express");
var router = express.Router();
const adminController = require("../controller/admin.Controller");
const authController = require("../controller/autologin");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", adminController.signUp);
router.post("/login", authController.adminlogin);
router.post(
  "/addroom",
  adminController.upload.array("File"),
  adminController.addRoom
);
router.get("/roomView", adminController.roomView);
router.get("/roomviewsingle/:id", adminController.roomViewSingle);
router.put(
  "/roomupdate",
  adminController.upload.array("File"),
  adminController.roomUpdate
);
router.delete("/roomdelete", adminController.roomDelete);

module.exports = router;
