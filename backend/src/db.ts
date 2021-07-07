import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts"
import {MONGO_HOST, MONGO_NAME, MONGO_PASSWORD, MONGO_USERNAME} from "../config.ts"
const client = new MongoClient();

export const db = await client.connect({
    db: MONGO_NAME,
    tls: true,
    servers: [
      {
        host: MONGO_HOST,
        port: 27017,
      },
    ],
    credential: {
      username: MONGO_USERNAME,
      password: MONGO_PASSWORD,
      db: MONGO_NAME,
      mechanism: "SCRAM-SHA-1",
    },
  });
