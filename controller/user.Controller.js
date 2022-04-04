const Hotel = require("../models/user.Schema");
const roomModel = require("../models/room.Schema");

class Usercontroller {
  signUp = async (req, res) => {
    try {
      const { firstName, lastName, emailId, password, phoneNumber } = req.body;

      if (!firstName || !lastName || !emailId || !password || !phoneNumber) {
        return res
          .status(400)
          .json({ message: "fill the field", success: false });
      }

      const userFind = await Hotel.findOne({ emailId: emailId });
      if (userFind) {
        return res
          .status(400)
          .json({ message: "user allready exist", success: false });
      } else {
        const userInfo = new Hotel({
          firstName,
          lastName,
          emailId,
          password,
          phoneNumber,
          role: "user",
        });

        const result = await userInfo.save();
        return res.status(200).json({
          message: "user signUp successfully",
          success: true,
          result,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message, success: false });
    }
  };

  roomView = async (req, res) => {
    try {
      const getDate = await roomModel.find({});
      if (!getDate)
        return res.status(404).json({
          message: `${getDate.length} room found`,
          success: true,
        });
      return res.status(200).json({
        message: "room view successfully",
        success: true,
        room: getDate,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message, success: false });
    }
  };
  roomViewSingle = async (req, res) => {
    try {
      
      const roomInfo = await roomModel.findOne({_id:req?.params?.id});
     
      if(!roomInfo) return res.status(400).json({success:false,message:"room Not Found"})
      else return res
        .status(200)
        .json({ message: `room found`, room: roomInfo, success: true });
    } catch (e) {
      console.log(e);
      return res.status(400).json(e, { message: e.message, success: false });
    }
  };
}

module.exports = new Usercontroller();
