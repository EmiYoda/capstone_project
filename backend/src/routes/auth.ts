import { Router } from "https://deno.land/x/oak/mod.ts";
import { Register, Login, getUser, Logout } from "../controllers/auth.ts";

const router = new Router();

router.post('/api/register', Register);
router.post('/api/login', Login);
router.get('/api/user', getUser);
router.post('/api/logout', Logout)


export default router;