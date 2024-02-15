import BlogModel from "../models/blogModels.js";

const createBlog = async (req, res) => {
  try {
    const data = req.body;
    const BlogInstance = new BlogModel({
      date: data.date,
      title: data.title,
      image: data.image,
      description: data.description,
      content: data.content,
    });
    await BlogInstance.save();
    res.send(BlogInstance);
  } catch (err) {
    console.log("Error occured", err);
    res.status(500).json({
      message: `Error ${err}`,
    });
  }
};
const readBlog = async (req, res) => {
  try {
    const datafound = await BlogModel.find({});
    if (datafound.length == 0) {
      res.status(404).json({
        message: "No data found",
        data: null,
      });
    } else {
      res.status(200).json({
        message: "Appointment is made",
        data: datafound,
      });
    }
  } catch (err) {
    console.log("The error occured", err);
    res.status(500).json({
      message: "Failed to get appointment because of error",
    });
  }
};
const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const updateinfo = req.body;
    let response = await BlogModel.find({ _id: blogId });
    if (response.length == 0) {
      res.status(404).json({
        message: "Blog was unsuccessfully updated !!",
        error: "Blog not found",
        data: null,
      });
    } else {
      let response = await BlogModel.findOneAndUpdate(
        { _id: blogId },
        { $set: updateinfo }
      );
      res.status(200).json({
        message: "The blog is updated",
        data: response,
      });
    }
  } catch (err) {
    console.log("Error occured in update", err);
    res.status(500).json({
      message: `Failed to update the blog because of ${err}`,
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    let blogId = req.params.id;
    const blogData = await BlogModel.findById(blogId);
    if (!blogData) {
      res.status(404).json({
        message: "Blog is not found",
        error: null,
        data: null,
      });
    } else {
      let response = await BlogModel.deleteOne({ _id: blogId });
      res.status(200).json({
        message: "The blog is deleted",
        data: response,
      });
    }
  } catch (err) {
    console.log("Error occured to delete", err);
    res.status(500).json({
      message: `Failed to delete the blog ${err}`,
    });
  }
};
export { createBlog, updateBlog, readBlog, deleteBlog };
