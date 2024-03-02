import mongoose, { Schema, model } from "mongoose";
import { CommentDoc } from "../utils/types";

const CommentSchema = new Schema<CommentDoc>(
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

export const Comment = model<CommentDoc>("Comment", CommentSchema);
