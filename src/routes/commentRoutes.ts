import express from "express";
import { Request, NextFunction, Response } from "express";
import passport from "passport";

import {
  createComment,
  readComment,
  singleComment,
  deleteComment,
} from "../controllers/comment";
import { isExistBlog, isValidComment } from "../middleware";

const BlogRouter = express.Router({ mergeParams: true });

BlogRouter.post(
  "/:id/comments",
  passport.authenticate("jwt", { session: false }),
  isValidComment,
  isExistBlog,
  createComment
);
BlogRouter.get("/:id/comments/read", isExistBlog, readComment);
BlogRouter.get("/:comment_id/read", singleComment);
BlogRouter.delete(
  "/:comment_id/delete",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);
