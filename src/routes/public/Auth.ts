import express, { Request, Response, NextFunction } from "express";
const Router = express.Router();
import Joi from "joi";
import jwt from "jsonwebtoken";
import { IUser } from "../../models/userAuth";

const signUpSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(10).required(),
  secondName: Joi.string().alphanum().min(3).max(10).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const signInSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

Router.post("/signup", async (req: Request, res: Response, next) => {
  const { error, value } = signUpSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });
  // User is validated and saved to the database here
  const { firstName, secondName, password } = req.body;
  ("first");
  const existingUser = await IUser.find({ email: req.body.email }).select(
    "-password"
  );
  existingUser;
  if (!existingUser.length) {
    const newUser = await IUser.create({
      first_name: firstName,
      second_name: secondName,
      email: req.body.email,
      password,
    });
    newUser.save();
    const { id, userType, email } = newUser;
    const token = jwt.sign({ id, userType, email }, process.env.JWT_SECRET);
    token;
    return res.status(201).json({
      status: 201,
      msg: "account created successfully",
      token,
      user: newUser,
    });
  }
  return res.status(400).json({ msg: "Email already in use" });
});

Router.post("/signin", async (req: Request, res: Response, next) => {
  const { error, value } = signInSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const userEmail = value.email as string;

  try {
    // FIND USER BY EMAIL
    const foundUser = await IUser.find({ email: req.body.email });
    if (!foundUser.length) {
      return res
        .status(404)
        .json({ msg: "Invalid Email /password combination!" });
    }
    const user = foundUser[0];
    // CHECK IF PASSWORD MATCH
    let isMatch = await user.comparePassword(req.body.password);
    // Assign JWT Token NOW
    if (!isMatch) {
      return res
        .status(403)
        .json({ msg: "Invalid Email /password combination!" });
    }
    const { id, userType, email } = user;
    const token = jwt.sign({ id, userType, email }, process.env.JWT_SECRET!);
    // Send back Response
    return res.status(200).json({
      status: 200,
      msg: "Logged In Successfully",
      token,
      user,
    });
  } catch (err) {
    return next(err);
  }
});

export { Router as AuthRoutes };
