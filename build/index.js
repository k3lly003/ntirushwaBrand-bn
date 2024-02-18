"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const BlogRoutes_js_1 = __importDefault(require("./routes/BlogRoutes.js"));
const error_middleware_js_1 = __importDefault(require("./middleware/error.middleware.js"));
const db_js_1 = require("./database/db.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
app.use("/api/blog", BlogRoutes_js_1.default);
//Error Handler
app.use(error_middleware_js_1.default);
const port = 2000;
app.listen(port, () => {
    console.log("server running " + port);
    (0, db_js_1.connectDB)();
});
