import Router, { Request, NextFunction, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { IUser } from "../models/userAuth";
const BlogRouter = Router();
// export interface MyRequest extends Request {
//   user: typeof IUser | undefined;
// }
import {
  isExistBlog,
  isExistTitle,
  isValidBlog,
  isValidComment,
  isValidQuerry,
} from "../middleware";

import {
  createBlog,
  readBlog,
  singleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/controller";

import {
  createComment,
  readComment,
  singleComment,
  deleteComment,
} from "../controllers/comment";

import {
  createQuerries,
  getQuerries,
  deleteQuerries,
} from "../controllers/querries";

// import { createNewLike, getLikeStatus } from "../controllers/likes";
// import passport from 'passport';
// import { IUser } from "../models/userAuth";
import { TOKENRESPONSE } from "../utils/types";

BlogRouter.post(
  "/blogs",
  passport.authenticate("jwt", { session: false }),
  isValidBlog,
  isExistTitle,
  createBlog
);
BlogRouter.get("/blogs", readBlog);
BlogRouter.patch(
  "/blogs/:id",
  passport.authenticate("jwt", { session: false }),
  isExistBlog,
  updateBlog
);
BlogRouter.get("/blogs/:id", isExistBlog, singleBlog);
BlogRouter.delete(
  "/blogs/:id",
  passport.authenticate("jwt", { session: false }),
  isExistBlog,
  deleteBlog
);

// all routes for comments

BlogRouter.post(
  "/blogs/:id/comments",
  passport.authenticate("jwt", { session: false }),
  isValidComment,
  isExistBlog,
  createComment
);
BlogRouter.get("/blogs/:id/comments", isExistBlog, readComment);
BlogRouter.get("/comments/:comment_id", singleComment);
BlogRouter.delete(
  "/comments/:comment_id",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);

BlogRouter.post("/querries", isValidQuerry, createQuerries);
BlogRouter.get("/querries", getQuerries);
BlogRouter.delete("/querries/:id", deleteQuerries);

// user like on specific blog
// BlogRouter.post(
//   "/blogs/:id/likes",
//   passport.authenticate("jwt", { session: false }),
//   isExistBlog,
//   createNewLike
// );
// BlogRouter.get("/blogs/:id/likes", isExistBlog, getLikeStatus);

export default BlogRouter;
