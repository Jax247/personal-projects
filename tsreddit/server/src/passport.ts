import { StrategyOptions, ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./entities";
import { __PROD__, key } from "./utils";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Request } from "express";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: key,
  issuer: "accounts.examplesoft.com",
  audience: "yoursite.net",
  // passReqToCallback: true,
} as StrategyOptions;

const MyStrategy = new Strategy(opts, function (jwt_payload, done) {
  const user = User.findOneBy({ id: jwt_payload.sub.id }).then((user) => {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });

  if (!user) return done({ error: "User Doesnt Exist" }, false);

  return done(null, user);
});

passport.use(MyStrategy);

const issueJWT = (payload: any) : string => {
  return "Bearer " +
    jwt.sign(payload, "process.env.JWT_SECRET", {
      expiresIn: "1d",
    });
}

const verifyJWT = (req: Request) => {
  // search for bearer token in Request Headers

  // split bearer to get token

  // verify token with secret key

  // If successful return
}

export { MyStrategy, issueJWT, verifyJWT };
