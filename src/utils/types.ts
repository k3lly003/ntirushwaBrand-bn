import { Schema } from "mongoose";

export interface Blog {
  date?: Date;
  title: string;
  image: string;
  description: string;
  content: string;
  // comments: Array<Comment>;
  // likes: Array<Likes>;
}
export interface User {
  name: string;
  email: string;
  role: string;
}
// export interface Likes {
//   blogId: string;
//   userId: string;
//   blogLike: boolean;
// }
export interface Comment {
  message: string;
  author: string;
  blogId: string;
}
export interface Querry {
  client_info: {
    names: string;
    email: string;
    location: string;
  };
  client_budget: string;
  client_message: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface TOKENRESPONSE {
  user: {
    _id: Schema.Types.ObjectId;
    email: string;
    names: string;
  };

  expireIn: number;
  iat: number;
}
export interface Client {
  client_info: User & { location: string };
  client_budget: string;
  client_message: string;
}
