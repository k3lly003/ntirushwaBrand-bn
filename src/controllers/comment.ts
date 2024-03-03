import { Request, Response } from "express";
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

export const readComment = async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    const post = await Comment.find({ blogId: req.params.blog_id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

export const singleComment = async (req: Request, res: Response) => {
  console.log(req.params.comment_id);
  try {
    const comment = await Comment.findOne({ _id: req.params.comment_id });
    res.send(comment);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};
