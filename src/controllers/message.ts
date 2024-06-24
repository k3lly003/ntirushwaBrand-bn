import { message } from "../models/message";

import { Request, Response, NextFunction } from "express";

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Message = await message.create({
      name: req.body.name,
      email: req.body.email,
      text: req.body.text,
    });

    await Message.save();
    res.status(201).json({ msg: "Message created successfully", Message });
  } catch (error) {
    console.log("Error from create messag", error);
    return next({ error });
  }
};

export const readMessage = async (req: Request, res: Response) => {
  const SMS = await message.find();
  res.send(SMS);
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    await message.deleteOne({ _id: req.params.id });
    res.status(204);
    res.send({ message: "message is deleted" });
  } catch {
    res.status(404);
    res.send({ error: "The message does not exist!" });
  }
};
