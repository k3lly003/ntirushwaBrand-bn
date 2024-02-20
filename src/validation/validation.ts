import Joi from "joi";
import { Client, User, Comment, Blog, Querry } from "../utils/types";
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

export const querriesValidation = (querries: Client) => {
  const userValidationSChema = Joi.object<User & { location: string }>({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    location: Joi.string().min(5).required(),
  });

  const validationRules = Joi.object<Client>({
    client_info: userValidationSChema,
    client_budget: Joi.string().required(),
    client_message: Joi.string().min(20).max(300).required(),
  });

  return validationRules.validate(querries);
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
