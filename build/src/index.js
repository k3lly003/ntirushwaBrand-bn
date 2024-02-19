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
const express_1 = __importDefault(require("express"));
const BlogRoutes_js_1 = __importDefault(require("./routes/BlogRoutes.js"));
const error_middleware_js_1 = __importDefault(require("./middleware/error.middleware.js"));
const db_js_1 = require("./database/db.js");
const app = (0, express_1.default)();
const port = 8000;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
app.use(express_1.default.json());
// app.use(blogAuth);
app.get("/blog", BlogRoutes_js_1.default);
// app.put("blog")
//Error Handler
app.use(error_middleware_js_1.default);
app.listen(port, () => {
    console.log("server running " + port);
    (0, db_js_1.connectDB)();
});
