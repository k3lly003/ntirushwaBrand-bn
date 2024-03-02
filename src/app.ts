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

require("../passport-config")(passport);

export const app = express();

app.use(express.json());

//Route for auth
app.use("/api/auth", AuthRoutes);

//Routes for creating blogs
app.use("/api/blogs", publicBlogRoutes);
app.use("/api/blogs", protectedBlogRoutes);

//Route for querry
app.use("/api/messages", MessageRouter);

app.use("/api/:blog_id/comments", CommentRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.use(errorHandler);

export default app;
