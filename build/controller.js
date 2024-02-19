"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.deleteBlog = exports.updateBlog = exports.readBlog = exports.createBlog = void 0;
const blogModels_1 = require("./src/models/blogModels");
const error_middleware_1 = require("./src/middleware/error.middleware");
// import errorHandler from "./src/middleware/error.middleware";
// Create a new blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author, image } = req.body;
        const newBlog = new blogModels_1.Blog({ title, content, author, image });
        yield newBlog.save();
        res
            .status(201)
            .json({ message: "Blog created successfully", data: newBlog });
    }
    catch (err) {
        // Handle errors using middleware or custom logic
        console.log("here goes the error");
        const error = new error_middleware_1.errorHandler(500, "Error creating blog", error.message);
        next(error);
    }
});
exports.createBlog = createBlog;
// Get a specific blog
const readBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const blog = yield blogModels_1.Blog.findById(blogId)
            .populate("comments")
            .populate("likes"); // Assuming "likes" is defined in Blog model
        if (!blog) {
            throw new AppError(404, "Blog not found"); // Use middleware
        }
        res.status(200).json({ data: blog });
    }
    catch (err) {
        next(err); // Pass to error handler if using middleware
    }
});
exports.readBlog = readBlog;
// Update a blog
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const { title, content, author, image } = req.body; // Adjust based on model properties
        // Find the blog by ID
        const blog = yield blogModels_1.Blog.findById(blogId);
        // Handle blog not found case
        if (!blog) {
            throw new AppError(404, "Blog not found"); // Use middleware
        }
        blog.title = title;
        blog.content = content;
        blog.author = author; // Assuming author can be updated
        blog.image = image;
        yield blog.save();
        res.status(200).json({ message: "Blog updated successfully", data: blog });
    }
    catch (err) {
        next(err); // Pass to error handler if using middleware
    }
});
exports.updateBlog = updateBlog;
// Delete a blog
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        // Optional authentication/authorization checks here
        // Find the blog by ID
        const blog = yield blogModels_1.Blog.findById(blogId);
        // Handle blog not found case
        if (!blog) {
            throw new AppError(404, "Blog not found"); // Use middleware
        }
        // Delete the blog
        yield blog.deleteOne();
        // Send a success response
        res.status(200).json({ message: "Blog deleted successfully" });
    }
    catch (err) {
        next(err); // Pass to error handler if using middleware
    }
});
exports.deleteBlog = deleteBlog;
// Create a new comment for a specific blog
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract comment data from request body
        const { text, author } = req.body;
    }
    catch (_a) { }
});
exports.createComment = createComment;
