const multer = require("multer");
const Hotel = require("../models/user.Schema");
const roomModel = require("../models/room.Schema");

class Admincontroller {
  multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/upload");
    },
    filename: (req, files, cb) => {
      const ext = files.mimetype.split("/")[1];
      cb(null, Date.now() + "." + ext);
    },
  });

  upload = multer({ storage: this.multerStorage });

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
          .json({ message: "admin allready exist", success: false });
      } else {
        const userInfo = new Hotel({
          firstName,
          lastName,
          emailId,
          password,
          phoneNumber,
          role: "admin",
        });

        const result = await userInfo.save();
        return res.status(200).json({
          message: "admin signUp successfully",
          success: true,
          result,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message, success: false });
    }
  };
  addRoom = async (req, res) => {
    try {
      const { roomId, roomtype, price } = req.body;
      const roomIn = req.files;
      const urldata = [];
      for (let key in roomIn) {
        urldata[key] = roomIn[key].filename;
      }
      const roomUrl = urldata;
      if (roomUrl.length <= 0) {
        return res
          .status(206)
          .json({ message: "fill the field", success: true });
      }
      if (!roomId || !roomtype || !price) {
        return res
          .status(206)
          .json({ message: "fill the field", success: true });
      }

      const roomIdexits = await roomModel.findOne({
        roomId: roomId,
      });
      if (roomIdexits) {
        return res
          .status(400)
          .json({ message: "roomId Already Exist", success: true });
      } else {
        const addingRoom = new roomModel({
          roomId: roomId,
          roomUrl: roomUrl,
          roomtype: roomtype,
          price: price,
        });
        const roomSave = addingRoom.save();
        return res.status(200).json({ message: "room add", success: true });
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
        rooms: getDate,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message, success: false });
    }
  };

  roomViewSingle = async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const getDate = await roomModel.findOne({ _id: id });
      if (!getDate)
        return res
          .status(404)
          .json({ message: `No room found`, success: false });
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

  roomUpdate = async (req, res) => {
    try {
      const { roomId, roomtype, price } = req.body;

      const roomIn = req.files;

      const urldata = [];
      for (let key in roomIn) {
        urldata[key] = roomIn[key].filename;
      }

      const roomUrl = urldata;
      if (roomUrl.length <= 0) {
        return res
          .status(206)
          .json({ message: "fill the field", success: false });
      }
      if (!roomId || !roomtype || !price) {
        return res
          .status(206)
          .json({ message: "fill the field", success: false });
      }

      const idInfo = await roomModel.findOne({ roomId: roomId });
      if (!idInfo) {
        return res
          .status(404)
          .json({ message: " room not found", success: false });
      } else {
        const id = idInfo._id;
        const result = await roomModel.findByIdAndUpdate(
          { _id: id },
          {
            roomId: roomId,
            roomUrl: roomUrl,
            roomtype: roomtype,
            price: price,
          },
          { new: true }
        );

        return res
          .status(200)
          .json({ message: "room successfully updated", success: true });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message, success: false });
    }
  };
  roomDelete = async (req, res) => {
    try {
      const { roomId } = req.body;
      console.log(roomId);

      if (!roomId) {
        return res
          .status(206)
          .json({ message: "fill the field", success: true });
      }
      const roomExist = await roomModel.findOne({ roomId: roomId });

      if (!roomExist) {
        return res
          .status(404)
          .json({ message: "roomId not found", success: true });
      } else {
        const id = roomExist._id;
        const roomFind = await roomModel.findByIdAndDelete(
          { _id: id },
          { roomId: roomId },
          { new: true }
        );
        return res
          .status(200)
          .json({ message: "room delete successfully", success: true });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message, success: false });
    }
  };
}

module.exports = new Admincontroller();
