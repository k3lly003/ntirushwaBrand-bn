import { Schema, model } from "mongoose";
import { Blog } from "../utils/types";

const BlogSchema = new Schema<Blog>(
  {
    date: {
      type: Date,
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
  },
  { timestamps: true }
);

export const blogs = model<Blog>("Blog", BlogSchema);
