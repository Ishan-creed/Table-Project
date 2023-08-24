import mongoose from "mongoose";
import validator from "validator";

const User = new mongoose.Schema({
  userId: {
    type: Number,
  },
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email address",
    },
  },
  hobbies: {
    type: String,
  },
});

const MyUser = mongoose.model("myUser", User);

export default MyUser;
