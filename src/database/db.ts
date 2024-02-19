import { Mongoose, connect } from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "../middleware/error.middleware";

dotenv.config();

export const connectDB = () => {
  try {
    Mongoose.connect(mongodb:localhost:27017, (error: any) => {
      if (error) throw new errorHandler(500, "Something terrible happened");
      console.log("connected to database");
    });
  } catch (error: any) {
    console.log("this is the error", error);
    throw new errorHandler(500, "Something terrible happened");
  }
};
