import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";

export interface User extends Document {
  _id: ObjectId;
  names: string;
  email: string;
  password: string;
  userType: string;
}
const userSchema = new Schema<User>(
  {
    names: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

export const IUser = model<User>("Users", userSchema);
