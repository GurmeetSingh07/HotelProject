const Hotel = require("../models/user.Schema");

class Authcontroller {
  adminlogin = async (req, res) => {
    try {
      const { emailId, password } = req.body;
      console.log(req.body);
      if (!emailId || !password) {
        return res
          .status(206)
          .json({ message: "Please fill the Field", success: false });
      }
      const admin = await Hotel.findOne({ emailId });

      if (!admin)
        return res
          .status(404)
          .json({ message: "admin not found", success: false });
      else if (admin.role !== "admin") {
        return res.status(401).json({
          message: "You are not Authorized admin",
          success: false,
        });
      }
      // condtion opreator
      if (admin.password != password) {
        return res.status(400).json({ message: "Invalid password" });
      } else {
        return res
          .status(200)
          .json({ message: " admin  Welcome ", success: true });
      }
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json(e, { message: "server error", success: false });
    }
  };

  userlogin = async (req, res) => {
    try {
      const { emailId, password } = req.body;
      console.log(req.body);
      if (!emailId || !password) {
        return res
          .status(206)
          .json({ message: "Please fill the Field", success: false });
      }
      const user = await Hotel.findOne({ emailId });
      console.log(user);

      if (!user)
        return res
          .status(404)
          .json({ message: "user not found", success: false });
      else if (user.role !== "user") {
        return res.status(401).json({
          message: "You are not Authorized user",
          success: false,
        });
      }
      // condtion opreator
      if (user.password != password) {
        return res.status(400).json({ message: "Invalid password" });
      } else {
        return res
          .status(200)
          .json({ message: " user  Welcome ", success: true });
      }
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json(e, { message: "server error", success: false });
    }
  };
}
module.exports = new Authcontroller();
