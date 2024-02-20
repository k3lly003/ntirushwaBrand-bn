import { Schema, model } from "mongoose";
import { Comment } from "../utils/types";

const CommentSchema = new Schema<Comment>(
  {
    author: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    blogId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const BlogComment = model<Comment>("userComment", CommentSchema);
