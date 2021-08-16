import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
    {
        image: String,
        title: {
            type: String,
            required: true,
        },
        description: String,
        markdown: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        slug: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        secretAuthor: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

postSchema.pre("validate", function (next) {
    const post = this as any;

    if (post.title) {
        post.slug = slugify(post.title, {});
    }

    next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
