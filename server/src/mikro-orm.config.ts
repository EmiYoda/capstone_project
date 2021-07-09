import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";

export default {
  entities: [Post],
  dbName: "photodb",
  //   user: process.env.PSQL_USER,
  //   password: process.env.PSQL_PASSWORD,
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
