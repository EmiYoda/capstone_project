import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import dotenv from "dotenv";
import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { User } from "./entities/User";
import session from "express-session";
import MongoStore from "connect-mongo";
import { MyContext } from "./types";

dotenv.config();

const main = async () => {
  const orm = await MikroORM.init({
    migrations: {
      path: path.join(__dirname, "./migrations"),
      pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post, User],
    dbName: "photodb",
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
    type: "postgresql",
    debug: !__prod__,
  });
  await orm.getMigrator().up();

  const app = express();

  app.use(
    session({
      name: "uid",
      secret: `${process.env.SECRET}`,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO,
        ttl: 14 * 24 * 60 * 60, // 14days
      }),
      cookie: {
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
        maxAge: 14 * 24 * 60 * 60,
      },
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({ app });

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
