export interface Comment {
  text: string;
  author: string;
  date: Date;
}
export interface Like {
  userId: string;
  date?: Date;
}
export interface Blog {
  date: Date;
  title: string;
  image: string;
  description: string;
  content: string;
  comments: Array<Comment>;
  likes: Array<Like>;
}
export interface User {
  name: string;
  email: string;
}
