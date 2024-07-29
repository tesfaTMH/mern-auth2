import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { customErrorHandler } from "../utils/customErrorHandler.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
    //next(customErrorHandler(303, "Something went wrong"));
  }
};
