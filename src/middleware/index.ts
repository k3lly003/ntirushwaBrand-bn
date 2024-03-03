import { Request, Response, NextFunction } from "express";
import { Blogs } from "../models/blogModels";

import { blogValidation } from "../validation/validation";

// console.log("My middleware has a problem");

export const isExistBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isExistBlog = await Blogs.findOne({ _id: req.params.id });
    if (!isExistBlog) {
      res.status(400);
      res.json({
        msg: "the blog you are looking does not exist please check and try again",
      });
    }
  } catch (error) {
    console.log("invalid input please try again", error);
  }
};

export const isValidBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const valid = blogValidation(req.body);
  if (!valid) {
    res.status(400);
    res.json({ msg: "the blog is not valid", valid });
    console.log("the blog is not valid");
  } else {
    next();
  }
};
