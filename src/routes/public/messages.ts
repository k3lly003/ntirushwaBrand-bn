import express from "express";
import {
  createMessage,
  readMessage,
  deleteMessage,
} from "../../controllers/message";
import { validateMessage } from "../../validation/validation";

const MessageRouter = express.Router({ mergeParams: true });

MessageRouter.post("/create", validateMessage, createMessage);
MessageRouter.get("/read", readMessage);
MessageRouter.delete("/:message_id/delete", deleteMessage);

export { MessageRouter };
