import express from "express";
import {
  createBlog,
  updateBlog,
  readBlog,
  deleteBlog,
} from "../controllers/BlogController.js";

const router = express.Router();
router.use(express.json());

router.post("/create", createBlog);
router.get("/read", readBlog);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

export default router;
