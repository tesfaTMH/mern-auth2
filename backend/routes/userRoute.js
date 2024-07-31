import express from "express";
import {
  userController,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const router = express.Router();

router.get("/", userController);
router.post("/update/:id", verifyUserToken, updateUser);
router.delete("/delete/:id", verifyUserToken, deleteUser);

export default router;
