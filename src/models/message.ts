import { Schema, model } from "mongoose";
import { Message } from "../utils/types";

const messageSchema = new Schema<Message>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const message = model<Message>("Message", messageSchema);
