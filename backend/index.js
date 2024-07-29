import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

connectDB();
const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
