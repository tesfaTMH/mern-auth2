import jwt from "jsonwebtoken";
import { customErrorHandler } from "./customErrorHandler.js";

export const verifyUserToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(customErrorHandler(401, "You need to Login"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(customErrorHandler(403, "Token is not valid"));

    req.user = user;
    next();
  });
};
