"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogs = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    date: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.blogs = (0, mongoose_1.model)("Blog", BlogSchema);
