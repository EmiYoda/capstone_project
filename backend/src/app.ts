import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import welcome from "./routes/welcome";
import { MONGO } from "./config";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

mongoose.connect(
    `${MONGO}`,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log("MongoDB Sucesfully connected")
);

app.use("/api", authRoutes);
app.use("/api", welcome);
// app.use("/api/files", fileRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
