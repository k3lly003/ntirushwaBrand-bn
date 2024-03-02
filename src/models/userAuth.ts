import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export interface User extends Document {
  _id: ObjectId;
  first_name: string;
  second_name: string;
  email: string;
  password: string;
  userType: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const userSchema = new Schema<User>(
  {
    first_name: {
      type: String,
      required: true,
    },
    second_name: {
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
      default: "admin",
    },
  },
  { timestamps: true }
);
// Schema hooks
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  } catch (err) {
    return next(err);
  }
});

// Schema methods
userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    console.log("password doesn't match", err);
    return next(err);
  }
};

export const IUser = model<User>("Users", userSchema);
