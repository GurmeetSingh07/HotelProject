const mongoose = require("../database/connection");

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    require: true,
    unique: true,
  },

  roomUrl: [
    {
      type: String,
      require: true,
    },
  ],

  roomtype: {
    type: String,
    enum: ["singleRoom", "doubleRoom", " tripleRoom", "quadRoom"],
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("roomModel", roomSchema);
