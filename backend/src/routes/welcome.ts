import express from "express";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/welcome", auth, (_req, res) => {
    res.status(200).send("Welcome");
});

export default router;
