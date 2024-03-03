const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
import { IUser } from "./src/models/userAuth";

let SECRET: any = "ntirukelly";
const opts: any = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      let user = await IUser.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
  );
};
