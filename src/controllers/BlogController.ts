import { Response, Request } from "express";
import BlogModel, {
  CreateBlogBody,
  UpdateBlogBody,
  ReadBlogResponse,
} from "../models/blogModels.ts";

interface MyParams {
  params: {
    id: string;
  };
}

const createBlog = async (
  req: Request<{}, {}, CreateBlogBody>,
  res: Response<ReadBlogResponse>
) => {
  try {
    const newBlogData = req.body;
    const newBlog = new BlogModel(newBlogData);
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", data: newBlog });
  } catch (err) {
    console.error(`Error creating blog: ${err}`);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

const readBlog = async (req: Request, res: Response<ReadBlogResponse>) => {
  try {
    const datafound = await BlogModel.find({});
    if (datafound.length === 0) {
      res.status(204).json({ message: "No blogs found", data: null });
    } else {
      res.status(200).json({ message: "Blogs found", data: datafound });
    }
  } catch (err) {
    console.error(`Error reading blogs: ${err}`);
    res.status(500).json({ message: "Error reading blogs" });
  }
};

const updateBlog = async (
  req: Request<MyParams>,
  res: Response<ReadBlogResponse>
) => {
  try {
    const blogId = req.params.id;
    const updateInfo = req.body as UpdateBlogBody;

    const existingBlog = await BlogModel.findById(blogId);
    if (!existingBlog) {
      res.status(404).json({ message: "Blog not found", data: null });
    } else {
      const updatedBlog = await BlogModel.findByIdAndUpdate(
        { _id: blogId },
        { $set: updateInfo },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Blog updated successfully", data: updatedBlog });
    }
  } catch (err) {
    console.error(`Error updating blog: ${err}`);
    res.status(500).json({ message: "Failed to update blog" });
  }
};

const deleteBlog = async (
  req: Request<{ params: { id: string } }>,
  res: Response<ReadBlogResponse>
) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      res.status(404).json({ message: "Blog not found", data: null });
    } else {
      res.status(200).json({ message: "Blog deleted successfully" });
    }
  } catch (err) {
    console.error(`Error deleting blog: ${err}`);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};

export { createBlog, updateBlog, readBlog, deleteBlog };
