import express from "express";
import { singleComment, readComment } from "../../controllers/comment";

const CommentRouter = express.Router({ mergeParams: true });

CommentRouter.get("/read/all", readComment);

CommentRouter.get("/read/comment_id", singleComment);

export { CommentRouter };
