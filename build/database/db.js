"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const error_middleware_1 = require("../middleware/error.middleware");
dotenv_1.default.config();
const connectDB = () => {
    try {
        (0, mongoose_1.connect)(process.env.MONGODB_URI, (error) => {
            if (error)
                throw new error_middleware_1.AppError(500, "Something terrible happened");
            console.log("connected to database");
        });
    }
    catch (error) {
        throw new error_middleware_1.AppError(500, "Something terrible happened");
    }
};
exports.connectDB = connectDB;
