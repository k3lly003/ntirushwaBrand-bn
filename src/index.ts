import express, { Request, Response } from "express";
import errorHandler from "./middleware/error.middleware";
import { connectDB } from "./database/db";

const app = express();

const port: number = 8000;

app.get("/", async (req: Request, res: Response) => {});

app.use(express.json());
// app.use(blogAuth);

// app.get("/blog", blogRoutes);
app.put("blog");

// //Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log("server running " + port);
  connectDB();
});
