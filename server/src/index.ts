import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import dotenv from "dotenv";
import path from "path";

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

  //   const post = orm.em.create(Post, { title: "my first post" });
  //   await orm.em.persistAndFlush(post);

  //   const posts = await orm.em.find(Post, {});
  //   console.log(posts);
};

main().catch((err) => {
  console.log(err);
});
