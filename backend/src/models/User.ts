import mongoose from "mongoose";
import Joi from "@hapi/joi";

const userSchema = new mongoose.Schema(
    {
        name: Joi.string().alphanum().min(3).max(30).required(),

        email: Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "net"] },
            })
            .required(),
        password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
        token: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
