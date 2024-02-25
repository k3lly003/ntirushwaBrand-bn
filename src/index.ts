import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import errorHandler from "./middleware/error.middleware";
import mongoose from "mongoose";
import { AuthRoutes } from "../src/routes/Auth";
import { BlogRouter } from "./routes/BlogRoutes";

const passport = require("passport");
require("../passport-config")(passport);

const app = express();

const port: number = 8000;

const mongo_uri = process.env.MONGO_URI as string;
console.log("this is my mongo_uri ", mongo_uri);
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose
  .connect(mongo_uri)
  .then(() => console.log("connected to Database"))
  .catch((e) => console.log(e));

app.use(express.json());

//Route for auth
app.use("/api/auth", AuthRoutes);

//Routes for creating blogs
app.use("api/blog", BlogRouter);

//Route for querry
// app.use("api/message");

app.use(errorHandler);

app.listen(port, () => {
  console.log("server running " + port);
});
