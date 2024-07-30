import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { customErrorHandler } from "../utils/customErrorHandler.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(customErrorHandler(404, "User not found"));
    }
    const matchedPassword = bcryptjs.compareSync(password, userFound.password);
    if (!matchedPassword) {
      return next(customErrorHandler(401, "Invalid credentials"));
    }
    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...userDetails } = userFound._doc;
    const expireDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expireDate })
      .status(200)
      .json(userDetails);
  } catch (err) {
    next(err);
  }
};
