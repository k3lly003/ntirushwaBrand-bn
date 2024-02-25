import mongoose, { Schema, model } from "mongoose";
import { Comment } from "../utils/types";

const CommentSchema = new Schema<Comment>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    message: {
      type: String,
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

export const BlogComment = model<Comment>("userComment", CommentSchema);
