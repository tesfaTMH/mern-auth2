import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

import { errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const __dirname = path.resolve();
connectDB();
const app = express();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.use(express.json());
app.use(cookieParser());

const PORT = 3000;

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
