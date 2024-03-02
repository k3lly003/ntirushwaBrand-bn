import express from "express";
import { Request, NextFunction, Response } from "express";
import passport from "passport";

import { createComment } from "../../controllers/comment";
import { authorizeUser } from "../../middleware/auth-user";
import { validateComment } from "../../validation/validation";

const CommentRouter = express.Router({ mergeParams: true });

CommentRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  authorizeUser,
  validateComment,
  createComment
);

export { CommentRouter };
