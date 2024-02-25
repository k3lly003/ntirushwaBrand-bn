import { Types } from "mongoose";

export interface Blog {
  author: Types.ObjectId;
  title: string;
  image: string;
  description: string;
  content: string;
  comments: Types.ObjectId[];
  likes: Types.ObjectId[];
  createdAt: string;
  updatedAt: string;
}
export interface User {
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export interface Comment {
  message: string;
  author: Types.ObjectId;
  blogId: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}
export interface Message {
  email: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
