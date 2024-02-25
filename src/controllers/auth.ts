import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/userAuth";

export const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { firstName, secondName, email, password } = req.body;
    let newUser = await IUser.create({
      first_name: firstName,
      second_name: secondName,
      email,
      password,
    });
    if (!newUser) return res.status(400).json("Error creating user");
    else {
      return res.status(201).json(newUser);
    }
  } catch (error) {
    return next({ error });
  }
};
