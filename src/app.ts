import express, { Request, Response } from "express";
import errorHandler from "./middleware/error.middleware";
import { AuthRoutes } from "./routes/public/Auth";
import { publicBlogRoutes } from "./routes/public/blogRoutes";
import { protectedBlogRoutes } from "./routes/protected/BlogRoutes";
import { MessageRouter } from "./routes/public/messages";
import { CommentRouter } from "./routes/protected/commentRoutes";
import swaggerUi from "swagger-ui-express";
import * as swagger from "../docs/swagger.json";
import passport from "passport";
import "../src/middleware/auth";
import cors from "cors";

require("../passport-config")(passport);

export const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// AUTH ROUTES
app.use("/api", AuthRoutes);

// BLOG ROUTES
app.use("/api/blogs", publicBlogRoutes);
app.use("/api/blogs", protectedBlogRoutes);

// MESSAGE ROUTES
app.use("/api/messages", MessageRouter);

// COMMENTS ROUTES

app.use("/api/blog", CommentRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.all("*", () => {
  throw new Error("Route Not Found");
});

app.use(errorHandler);

export default app;
