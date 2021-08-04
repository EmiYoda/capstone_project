import express from "express";
import post from "../controllers/Post";

const router = express.Router();

router.get("/post", post.getPosts);
router.get("/post/:slug", post.getPostBySlug);

router.post("/new/post", post.createPost);
router.put("/update/:id", post.updatePost);
router.delete("/delete/:id", post.deletePost);

export default router;
