import express from "express";
import { Request, NextFunction, Response } from "express";
import passport from "passport";

import { createComment, updateComment } from "../../controllers/comment";
import { authorizeUser } from "../../middleware/auth-user";
import { validateComment } from "../../validation/validation";

const CommentRouter = express.Router({ mergeParams: true });

CommentRouter.post(
  "/:blog_id/comment",
  passport.authenticate("jwt", { session: false }),
  authorizeUser,
  validateComment,
  createComment
);
CommentRouter.patch(
  "/:comment_id/comment",
  passport.authenticate("jwt", { session: false }),
  authorizeUser,
  validateComment,
  updateComment
);

export { CommentRouter };
