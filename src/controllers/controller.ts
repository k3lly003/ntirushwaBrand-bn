import { Blogs } from "../models/blogModels";

import express, { Request, Response, NextFunction } from "express";
import { uploadFiles, dataUri } from "../services/services";
import { error } from "console";

declare global {
  namespace Express {
    interface Request {
      files?: [];
    }
  }
}

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blogs.create({
      author: req.userId,
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
    });
    if ("image" in req.files!) {
      const uploadedBlogImage = req.files.image[0];
      const base64image = dataUri(uploadedBlogImage);
      const cloudImg = await uploadFiles(
        base64image.content,
        { folder: "blogImages" },
        function (err, result) {
          if (err) {
            console.log("this is Cloudinary error", err);
            return res.json({ msg: "DEBUGIIIII", err });
          }
          console.log("this is Cloudinary result", result);
          return result;
        }
      );
      blog.image = cloudImg.url;
    } else {
      return res.status(400).json({ msg: "You must have an image" });
    }
    await blog.save();
    res.status(201).json({ msg: "Blog created successfully", blog });
  } catch (error) {
    console.log("this is error from create blog", error);
    return next({ error });
  }
};

export const readBlog = async (req: Request, res: Response) => {
  const posts = await Blogs.find();
  res.send(posts);
};

export const singleBlog = async (req: Request, res: Response) => {
  try {
    const post = await Blogs.findById(req.params.blog_id)
      .populate("author", "first_name second_name ")
      .populate({
        path: "comments",
        select: "message",
        populate: {
          path: "author",
          select: "first_name second_name ",
        },
      });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post does not exist!" });
  }
};

//Like Blog
export const handleLikeBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundBlog = await Blogs.findById(req.params.blog_id);
    const check = foundBlog!.likes.includes(req.userId!);
    if (check) {
      var index = foundBlog!.likes.indexOf(req.userId!);
      if (index >= 0) {
        foundBlog!.likes.splice(index, 1);
      }
    } else {
      foundBlog!.likes.push(req.userId!);
    }
    await foundBlog!.save();
    return res
      .status(200)
      .json({ status: 200, blog: foundBlog, msg: "Blog Updated successfully" });
  } catch (err) {
    return next({ err });
  }
};

//end of like blog

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const post = await Blogs.findOne({ _id: req.params.blog_id });

    if (post) {
      if ("image" in req.files!) {
        const uploadedBlogImage = req.files.image[0];
        const base64image = dataUri(uploadedBlogImage);
        const cloudImg = await uploadFiles(
          base64image.content,
          { folder: "blogImages" },
          function (err, result) {
            if (err) {
              console.log("this is Cloudinary error", err);
              return res.json(err);
            }
            console.log("this is Cloudinary result", result);
            return result;
          }
        );
        post.image = cloudImg.url;
      } else {
        return res.status(400).json({ msg: "You must have an image" });
      }
      post.title = req.body.title;
      post.description = req.body.description;
      post.content = req.body.content;

      await post.save();
      res.send(post);
    }
  } catch {
    res.status(404);
    res.send({ error: "Content does not exist!" });
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("THIS IS THRE ID", req.params.blog_id);
    const result = await Blogs.deleteOne({ _id: req.params.blog_id });
    console.log(result);
    if (result.deletedCount === 1) {
      console.log("WHY CAN'T YOU WORK");
      res.status(204).json({ msg: "blog is deleted" });
    } else {
      res
        .status(204)
        .json({ msg: "blog failed to be deleted try again later" });
    }
  } catch (error) {
    return next(error);
    // res.status(404).send({ error: "The blog does not exist!" });
  }
};
