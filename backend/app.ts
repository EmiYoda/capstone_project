import { Application } from "https://deno.land/x/oak/mod.ts";
import {oakCors} from "https://deno.land/x/cors@v1.2.2/mod.ts"

import router from "./src/routes/auth.ts";
const app = new Application();

app.use(oakCors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(router.routes());
app.use(router.allowedMethods());

console.log("listening on port 8000")

await app.listen({ port: 8000 });