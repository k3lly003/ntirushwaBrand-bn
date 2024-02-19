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
        (0, mongoose_1.connect)(process.env.MONGODB_URI, (error) => , void );
    }
    finally { }
};
exports.connectDB = connectDB;
{
    if (error)
        throw new error_middleware_1.errorHandler(500, "Something terrible happened");
    console.log("connected to database");
}
;
try { }
catch (error) {
    console.log("this is the error", error);
    throw new error_middleware_1.errorHandler(500, "Something terrible happened");
}
;
