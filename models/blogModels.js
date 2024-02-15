import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  date: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Blog", BlogSchema);
