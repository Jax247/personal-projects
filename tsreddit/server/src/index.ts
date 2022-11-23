import "reflect-metadata";
import db from "./data";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
// import { PostController, UserController } from "./controllers";
// import session from "express-session";
// import Redis from "ioredis";
// import Connect from "connect-redis";
import { __PROD__ } from "./utils";
import { Context } from "./types";
import passport from "passport";
import { Request, Response } from "express";
import { PostController, UserController } from "./controllers";

var express = require("express");
var app = express();
const PORT = 4400;

const main = async () => {
  await db
    .initialize()
    .then(() => console.log("Database Initialized\n"))
    .catch((e) => console.error("Database Initialization Failed\n", e));

  app.listen(PORT, () => {
    console.log("Server Initialized on port:", PORT);
  });

  // let RedisStore = Connect(session);

  // let redisClient = new Redis();
  app.use(passport.initialize());

  // app.use(
  //   session({
  //     name: "xid",
  //     store: new RedisStore({
  //       client: redisClient,
  //       disableTouch: true,
  //     }),
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24 * 365 * 5, // 5 Years
  //       httpOnly: true,
  //       sameSite: "lax",
  //       secure: __PROD__,
  //     },
  //     saveUninitialized: false,
  //     secret: "keyboard cat",
  //     resave: false,
  //   })
  // );

  const APserver = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostController, UserController],
      validate: false,
    }),
    context: (req: Request, res: Response): Context => ({ req, res }),
  });
  await APserver.start();
  APserver.applyMiddleware({ app });
  APserver;
};

main().catch((err) => console.error(err));
