import { Request, NextFunction, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import express from "express";
const BlogRouter = express.Router({ mergeParams: true });
// export interface MyRequest extends Request {
//   user: typeof IUser | undefined;
// }
import {
  isExistBlog,
  isExistTitle,
  isValidBlog,
  // isValidQuerry,
} from "../middleware";
import {
  createBlog,
  readBlog,
  singleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/controller";

import {
  createQuerries,
  getQuerries,
  deleteQuerries,
} from "../controllers/querries";

BlogRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isValidBlog,
  isExistTitle,
  createBlog
);
BlogRouter.get("/read", readBlog);
BlogRouter.patch(
  "/:id/update",
  passport.authenticate("jwt", { session: false }),
  isExistBlog,
  updateBlog
);
BlogRouter.get("/:id/read", isExistBlog, singleBlog);
BlogRouter.delete(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  isExistBlog,
  deleteBlog
);

// BlogRouter.post("/querries", isValidQuerry, createQuerries);
// BlogRouter.get("/querries", getQuerries);
// BlogRouter.delete("/querries/:id", deleteQuerries);

// user like on specific blog
// BlogRouter.post(
//   "/blogs/:id/likes",
//   passport.authenticate("jwt", { session: false }),
//   isExistBlog,
//   createNewLike
// );
// BlogRouter.get("/blogs/:id/likes", isExistBlog, getLikeStatus);

export { BlogRouter };
