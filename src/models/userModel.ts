import { Schema, model } from "mongoose";
import { User } from "../utils/types";

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const user = model<User>("User", UserSchema);
