import { Blogs } from "../models/blogModels";

import { Request, Response } from "express";

export const createBlog = async (req: Request, res: Response) => {
  const blog = new Blogs({
    title: req.body.title,
    image: req.body.image,
    blogIntro: req.body.blogIntro,
    likes: req.body.like,
    content: req.body.content,
  });

  const newblog = await blog.save();
  res.send(newblog);
};

export const readBlog = async (req: Request, res: Response) => {
  const posts = await Blogs.find();
  res.send(posts);
};

export const singleBlog = async (req: Request, res: Response) => {
  try {
    const post = await Blogs.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post does not exist!" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const post = await Blogs.findOne({ _id: req.params.id });

    if (post) {
      if (req.body.title) {
        post.title = req.body.title;
      }

      if (req.body.image) {
        post.image = req.body.image;
      }

      if (req.body.content) {
        post.content = req.body.content;
      }

      await post.save();
      res.send(post);
    }
  } catch {
    res.status(404);
    res.send({ error: "Content does not exist!" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    await Blogs.deleteOne({ _id: req.params.id });
    res.status(204);
    res.send({ message: "blog is deleted" });
  } catch {
    res.status(404);
    res.send({ error: "The blog does not exist!" });
  }
};
