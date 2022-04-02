const mongoose = require("../database/connection");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },

  lastName: {
    type: String,
    require: true,
  },
  emailId: {
    type: String,
    require: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is not correct formate");
      }
    },
  },
  password: {
    type: String,
    require: true,
    minlength: [8, "minlength is 8 required"],
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  role: {
    type: String,
  },
});

module.exports = mongoose.model("Hotel", userSchema);
