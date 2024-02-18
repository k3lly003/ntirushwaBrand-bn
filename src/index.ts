import express, { Request, Response } from "express";
import blogRoutes from "./routes/BlogRoutes.js";
import errorHandler from "./middleware/error.middleware.js";
import { connectDB } from "./database/db.js";

const app = express();

const port: number = 2000;

app.get("/", async (req: Request, res: Response) => {});

app.use(express.json());
// app.use(blogAuth);

app.get("/blog", blogRoutes);

//Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log("server running " + port);
  connectDB();
});
