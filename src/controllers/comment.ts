import { Request, Response } from "express";
import { BlogComment } from "../models/commentModel";

export const createComment = async (req: Request, res: Response) => {
  try {
    const newComment = new BlogComment({
      blogId: req.params.id,
      user: req.body.user,
    });

    const comment = await newComment.save();
    res.send(comment);
  } catch {
    res.status(404);
    res.send({ error: "some thing went wrong with your comment" });
  }
};

export const readComment = async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    const post = await BlogComment.find({ blogId: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

export const singleComment = async (req: Request, res: Response) => {
  console.log(req.params.comment_id);
  try {
    const comment = await BlogComment.findOne({ _id: req.params.comment_id });
    res.send(comment);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    await BlogComment.deleteOne({ _id: req.params.comment_id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};
