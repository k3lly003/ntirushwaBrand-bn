import mongoose from "mongoose";
import dotenv from "dotenv";
import blogsRoutes from "../routes/BlogRoutes";
// import { errorHandler } from "../middleware/error.middleware";
import express, { Response, Request, NextFunction } from "express";

dotenv.config();
const app = express();
const db = process.env.Mongo_URI;
export const connectDB = async () => {
  mongoose
    .connect(db as string)
    .then(() => {
      app.use(express.json());

      app.use("/api", blogsRoutes);

      app.use(function (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
      ) {
        res.status(err.status || 500);
        res.json({ error: err });
      });
    })
    .catch((err: Error) => {
      console.log("something went wrong");
    });
};
