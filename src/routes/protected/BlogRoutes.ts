import express, { Request, NextFunction, Response } from "express";
import passport from "passport";

const BlogRouter = express.Router({ mergeParams: true });

import { isValidBlog } from "../../middleware";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  handleLikeBlog,
} from "../../controllers/controller";

import { authorizeUser, checkIsUserAdmin } from "../../middleware/auth-user";

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

BlogRouter.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  passport.authenticate("jwt", { session: false }),
  isValidBlog,
  checkIsUserAdmin,
  createBlog
);

BlogRouter.patch(
  "/:blog_id/update",
  upload.fields([{ name: "image", maxCount: 1 }]),
  passport.authenticate("jwt", { session: false }),
  checkIsUserAdmin,
  updateBlog
);
BlogRouter.patch(
  "/:blog_id/like",
  passport.authenticate("jwt", { session: false }),
  authorizeUser,
  handleLikeBlog
);

BlogRouter.delete(
  "/:blog_id/delete",
  passport.authenticate("jwt", { session: false }),
  checkIsUserAdmin,
  deleteBlog
);

export { BlogRouter as protectedBlogRoutes };
