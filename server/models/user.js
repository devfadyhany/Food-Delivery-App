import mongoose from "mongoose";
import Order from "./order.js";

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required."],
  },
  email: {
    type: String,
    required: [true, "email-address is required."],
    unique: [true, "email-address must be unique."],
  },
  password: {
    type: String,
    required: [true, "password is required."],
  },
  role: {
    type: String,
    enum: { values: ["user", "admin"], message: "{VALUE} is not supported." },
    default: "user",
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userschema);
