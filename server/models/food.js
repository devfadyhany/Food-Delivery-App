import mongoose from "mongoose";

const foodschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "category is required."],
  },
  price: {
    type: Number,
    required: [true, "price is required."],
  },
  image: {
    type: String,
    required: [true, "image is required."],
  },
});

export default mongoose.model("Food", foodschema);
