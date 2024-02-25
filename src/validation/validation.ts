import Joi from "joi";
import { User, Comment, Blog, Message } from "../utils/types";
//import querries from "../models/querries";

export const blogValidation = (blogs: Blog) => {
  const blogsValidationSchema = Joi.object<Blog>({
    title: Joi.string().min(20).max(50).required(),
    image: Joi.string().required(),
    description: Joi.string().min(10).max(50).required(),
    content: Joi.string().min(300).required(),
  });

  return blogsValidationSchema.validate(blogs);
};

export const querriesValidation = (message: Message) => {
  const userValidationSChema = Joi.object<User & { location: string }>({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    location: Joi.string().min(5).required(),
  });
};

export const validateComment = (comment: Comment) => {
  const userValidationSChema = Joi.object<User & { message: string }>({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(20).max(200).required(),
  });

  const validationRules = Joi.object<Comment>({
    author: userValidationSChema,
  });

  return validationRules.validate(comment);
};
