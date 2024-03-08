import express, { Request, NextFunction, Response } from "express";

const BlogRouter = express.Router({ mergeParams: true });
import { readBlog, singleBlog } from "../../controllers/controller";

BlogRouter.get("/:blog_id", singleBlog);
BlogRouter.get("/", readBlog);

export { BlogRouter as publicBlogRoutes };
