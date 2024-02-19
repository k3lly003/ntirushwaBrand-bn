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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.readBlog = exports.updateBlog = exports.createBlog = void 0;
const blogModels_1 = __importDefault(require("../models/blogModels"));
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBlogData = req.body;
        const newBlog = new blogModels_1.default(newBlogData);
        yield newBlog.save();
        res
            .status(201)
            .json({ message: "Blog created successfully", data: newBlog });
    }
    catch (err) {
        console.error(`Error creating blog: ${err}`);
        res.status(500).json({ message: "Failed to create blog" });
    }
});
exports.createBlog = createBlog;
const readBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datafound = yield blogModels_1.default.find({});
        if (datafound.length === 0) {
            res.status(204).json({ message: "No blogs found", data: null });
        }
        else {
            res.status(200).json({ message: "Blogs found", data: datafound });
        }
    }
    catch (err) {
        console.error(`Error reading blogs: ${err}`);
        res.status(500).json({ message: "Error reading blogs" });
    }
});
exports.readBlog = readBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const updateInfo = req.body;
        const existingBlog = yield blogModels_1.default.findById(blogId);
        if (!existingBlog) {
            res.status(404).json({ message: "Blog not found", data: null });
        }
        else {
            const updatedBlog = yield blogModels_1.default.findByIdAndUpdate({ _id: blogId }, { $set: updateInfo }, { new: true });
            res
                .status(200)
                .json({ message: "Blog updated successfully", data: updatedBlog });
        }
    }
    catch (err) {
        console.error(`Error updating blog: ${err}`);
        res.status(500).json({ message: "Failed to update blog" });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const deletedBlog = yield blogModels_1.default.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            res.status(404).json({ message: "Blog not found", data: null });
        }
        else {
            res.status(200).json({ message: "Blog deleted successfully" });
        }
    }
    catch (err) {
        console.error(`Error deleting blog: ${err}`);
        res.status(500).json({ message: "Failed to delete blog" });
    }
});
exports.deleteBlog = deleteBlog;
