import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: [true, "user_id is required"],
  },
  first_name: {
    type: String,
    required: [true, "first_name is required"],
  },
  last_name: {
    type: String,
    required: [true, "last_name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  street: {
    type: String,
    required: [true, "street is required"],
  },
  city: {
    type: String,
    required: [true, "city is required"],
  },
  floor_number: {
    type: String,
    required: [true, "floor_number is required"],
  },
  start_date: {
    type: Date,
    default: Date.now(),
  },
  items: {
    type: Array,
    default: [],
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
  },
  status: {
    type: String,
    enum: {
      values: ["in-processing", "out-for-delivery", "delivered"],
      message: "{VALUE} is not supported.",
    },
    default: "in-processing",
  },
  payment: {
    type: Boolean,
    default: false,
  },
  paymobOrderId: {
    type: String,
    required: [true, "paymobOrderId is required"],
  },
});

export default mongoose.model("Order", orderschema);
