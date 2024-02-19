import { Request, Response } from "express";
import { Blog, Comment } from "./src/models/blogModels";
import { errorHandler } from "./src/middleware/error.middleware";
// import errorHandler from "./src/middleware/error.middleware";

// Create a new blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, author, image } = req.body;

    const newBlog = new Blog({ title, content, author, image });
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", data: newBlog });
  } catch (err: any) {
    // Handle errors using middleware or custom logic
    console.log("here goes the error");
    const error: any = new errorHandler(
      500,
      "Error creating blog",
      error.message
    );
    next(error);
  }
};

// Get a specific blog
export const readBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId)
      .populate("comments")
      .populate("likes"); // Assuming "likes" is defined in Blog model

    if (!blog) {
      throw new AppError(404, "Blog not found"); // Use middleware
    }
    res.status(200).json({ data: blog });
  } catch (err) {
    next(err); // Pass to error handler if using middleware
  }
};

// Update a blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const { title, content, author, image } = req.body; // Adjust based on model properties

    // Find the blog by ID
    const blog = await Blog.findById(blogId);

    // Handle blog not found case
    if (!blog) {
      throw new AppError(404, "Blog not found"); // Use middleware
    }

    blog.title = title;
    blog.content = content;
    blog.author = author; // Assuming author can be updated
    blog.image = image;
    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", data: blog });
  } catch (err) {
    next(err); // Pass to error handler if using middleware
  }
};

// Delete a blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    // Optional authentication/authorization checks here

    // Find the blog by ID
    const blog = await Blog.findById(blogId);

    // Handle blog not found case
    if (!blog) {
      throw new AppError(404, "Blog not found"); // Use middleware
    }

    // Delete the blog
    await blog.deleteOne();

    // Send a success response
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    next(err); // Pass to error handler if using middleware
  }
};

// Create a new comment for a specific blog
export const createComment = async (req: Request, res: Response) => {
  try {
    // Extract comment data from request body
    const { text, author } = req.body;
  } catch {}
};
