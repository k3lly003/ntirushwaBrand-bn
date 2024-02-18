import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import blogRoutes from "./routes/BlogRoutes.js";
import errorHandler from "./middleware/error.middleware.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());
dotenv.config();
app.use("/api/blog", blogRoutes);
//Error Handler
app.use(errorHandler);
const port = 2000;
const connectToMongodb = () => {
    mongoose
        .connect(process.env.MONGODBPASS)
        .then(() => {
        console.log("mongodb connect");
    })
        .catch(() => {
        console.log("mongodb not connected");
    });
};
app.listen(port, () => {
    console.log("server running " + port);
    connectToMongodb();
});
