import express from "express";
import {
  createMessage,
  readMessage,
  deleteMessage,
} from "../../controllers/message";
const MessageRouter = express.Router({ mergeParams: true });

MessageRouter.post("/create", createMessage);
MessageRouter.get("/read", readMessage);
MessageRouter.delete("/:message_id/delete", deleteMessage);

export { MessageRouter };
