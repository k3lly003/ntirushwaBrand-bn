import mongoose, { Schema, model } from "mongoose";
import { Blog } from "../utils/types";

const BlogSchema = new Schema<Blog>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);

export const Blogs = model<Blog>("Blog", BlogSchema);
