import { Schema } from "mongoose";
export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  names: string;
  email: string;
  password: string;
  userType: string;
}
