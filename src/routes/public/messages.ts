import express from "express";
import {
  createMessage,
  readMessage,
  deleteMessage,
} from "../../controllers/message";
import { validateMessage } from "../../validation/validation";

const MessageRouter = express.Router({ mergeParams: true });

MessageRouter.post("/", validateMessage, createMessage);
MessageRouter.get("/", readMessage);
MessageRouter.delete("/:message_id", deleteMessage);

export { MessageRouter };
