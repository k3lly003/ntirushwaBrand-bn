import Joi from "joi";
import express, { Response, Request, NextFunction } from "express";
import { User, CommentDoc, Blog, Message } from "../utils/types";
//import querries from "../models/querries";

export const blogValidation = (blogs: Blog) => {
  const blogsValidationSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(50).required(),
    content: Joi.string().min(3).required(),
  });

  return blogsValidationSchema.validate(blogs);
};
//Define Validate schema for messages
const messageValidationSChema = Joi.object({
  email: Joi.string().email().required(),
  text: Joi.string().min(5).required(),
});

export const validateMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = messageValidationSChema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ msg: "Your message is not validated", error });
  next();
};

// Define a validation schema for comments
const commentSchema = Joi.object({
  message: Joi.string().min(3).max(500).required(),
});

// validate middleware for comment
export const validateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = commentSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: "must be valid" });
  next();
};
