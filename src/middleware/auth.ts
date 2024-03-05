import passport from "passport";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Strategy as localStrategy } from "passport-local";
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
import { IUser } from "../models/userAuth";

import { Request, Response } from "express";
// import { TOKENRESPONSE } from "../utils/types";

dotenv.config();

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req: Request, email, password, done: any) => {
      try {
        console.log("second", req.body);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        let names = req.params.names;
        let user = await new IUser({
          names,
          email,
          password: hashPassword,
        });

        await user.save();
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// ...

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await IUser.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.comparePassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// passport.use(
//   new JWTstrategy(jwtOptions, async (token: TOKENRESPONSE, done: any) => {
//     try {
//       console.log(process.env.JWT_SECRET);
//       return done(null, token.user);
//     } catch (error) {
//       done(error);
//     }
//   })
// );

const userPassport = passport;

export default userPassport;
