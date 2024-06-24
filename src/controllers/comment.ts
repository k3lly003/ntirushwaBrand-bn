import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Comment } from "../models/commentModel";
import { Blogs } from "../models/blogModels";

declare global {
  namespace Express {
    interface Request {
      userId?: Types.ObjectId;
      userType?: string;
    }
  }
}

export const createComment = async (req: Request, res: Response) => {
  try {
    console.log("ON LINE 17", req.params.blog_id);
    const blog = await Blogs.findById(req.params.blog_id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    const newComment = await Comment.create({
      blogId: blog._id,
      message: req.body.message,
      author: req.userId,
    });
    blog.comments.push(newComment._id);
    await blog.save();
    await newComment.save();
    const updateBlog = await Blogs.findById(blog._id).populate({
      path: "comments",
      select: "message",
      populate: {
        path: "author",
        select: "first_name second_name",
      },
    });
    return res
      .status(201)
      .json({ msg: "Comment created successfull", updateBlog });
  } catch (err) {
    console.log(err);
    res.status(404);
    res.send({ error: "some thing went wrong with your comment" });
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params.comment_id);
  try {
    const post = await Comment.findById(req.params.comment_id);
    if (!post && post.author != req.userId) {
      return res
        .status(404)
        .send({ msg: "You are not the owner of this Post" });
    }
    post.message = req.body.message;
    await post.save();
    return res
      .status(200)
      .json({ msg: "Post has been updated successfully", comment: post });
  } catch (error) {
    return next(error);
  }
};
