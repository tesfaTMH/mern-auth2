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

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...userDetails } = user._doc;
      const expireDate = new Date(Date.now() + 3600000);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expireDate: expireDate,
        })
        .status(200)
        .json(userDetails);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword2 = bcryptjs.hashSync(generatedPassword, 10);

      console.log(req);

      const newUser = new User({
        username:
          req.body.token.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword2,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...userDetails } = user._doc;
      const expireDate = new Date(Date.now() + 3600000);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expireDate: expireDate,
        })
        .status(200)
        .json(userDetails);
    }
  } catch (err) {
    next(err);
  }
};

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success");
};
