import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import dotenv from "dotenv";
import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

dotenv.config();

const main = async () => {
  const orm = await MikroORM.init({
    migrations: {
      path: path.join(__dirname, "./migrations"),
      pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post],
    dbName: "photodb",
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
    type: "postgresql",
    debug: !__prod__,
  });
  await orm.getMigrator().up();

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
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
