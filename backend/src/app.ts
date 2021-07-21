import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import welcome from "./routes/welcome";
import { MONGO } from "./config";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    `${MONGO}`,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log("MongoDB Sucesfully connected")
);

app.use("/api", authRoutes);
app.use("/api", welcome);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
