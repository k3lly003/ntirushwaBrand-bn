import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

const port: number = 8000;

const mongo_uri = process.env.MONGO_URI as string;
console.log("this is my mongo_uri ", mongo_uri);
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose
  .connect(mongo_uri)
  .then(() => console.log("connected to Database"))
  .catch((e) => console.log(e));

app.listen(port, () => {
  console.log("server running " + port);
});
