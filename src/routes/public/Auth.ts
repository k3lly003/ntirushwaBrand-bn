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
  console.log("this is req.body on line 29", req.body);
  const { error, value } = signUpSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });
  // User is validated and saved to the database here
  const { firstName, secondName, password } = req.body;
  console.log("first");
  const existingUser = await IUser.find({ email: req.body.email }).select(
    "-password"
  );
  console.log(existingUser);
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
    console.log(token);
    return res.status(201).json({ msg: "account created successfully", token });
  }
  return res.status(400).json({ msg: "Email already in use" });
});

Router.post("/signin", async (req: Request, res: Response, next) => {
  const { error, value } = signInSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const userEmail = value.email as string;

  try {
    // Find use by email
    const foundUser = await IUser.find({ email: req.body.email });
    console.log("this is the found user", foundUser);
    if (!foundUser.length) {
      return res
        .status(401)
        .json({ msg: "Invalid Email /password combination!" });
    }

    const user = foundUser[0];
    console.log("this is req.body.pass", req.body.password);
    // Check if password match
    let isMatch = await user.comparePassword(req.body.password);
    console.log("this is match", isMatch);
    // Assign JWT Token
    if (!isMatch) {
      return res
        .status(401)
        .json({ msg: "Invalid Email /password combination!" });
    }
    const { id, userType, email } = user;
    const token = jwt.sign({ id, userType, email }, process.env.JWT_SECRET!);
    // Send back Response
    return res.status(200).json({ msg: "Logged In Successfully", token });
  } catch (err) {
    return next(err);
  }
});

export { Router as AuthRoutes };
