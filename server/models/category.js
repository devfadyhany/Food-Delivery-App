import mongoose from "mongoose";

const categoryschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  image: {
    type: String,
    required: [true, "image is required."],
  },
});

export default mongoose.model("Category", categoryschema);
