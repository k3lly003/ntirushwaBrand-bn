import { Router, Request, Response } from "express";
import {
  getBlog,
  deactivateBlog,
  updateBlog,
} from "../controllers/BlogController";

const router: Router = Router();

router.get("/", getBlog);
router.put("/", updateBlog);
router.delete("/", deactivateBlog);

export default router;
