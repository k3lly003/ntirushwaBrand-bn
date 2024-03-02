import express, { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      userId?: Types.ObjectId;
      userType?: string;
    }
  }
}
export const checkIsUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userToken = req.headers.authorization!.split(" ")[1].trim();
    const data = jwt.verify(userToken, process.env.JWT_SECRET!);
    if (data.userType != "admin")
      return res.send({ msg: "You're not authorized" });
    req.userId = data.id;
    req.userType = data.userType;
    return next();
  } catch (err) {
    return next({ err });
  }
};

export const authorizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userToken = req.headers.authorization?.split(" ")[1].trim();
    const data = jwt.verify(userToken, process.env.JWT_SECRET!);
    req.userId = data.id;
    req.userType = data.userType;
    return next();
  } catch (err) {
    return next({ err });
  }
};
