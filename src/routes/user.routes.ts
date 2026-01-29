import { Router } from "express";
import {
  register,
  login,
  getUserById,
  getAllUsers,
  blockUser,
} from "../controllers/user.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/:id", authMiddleware, getUserById);
router.get("/", authMiddleware, adminOnly, getAllUsers);
router.patch("/:id/block", authMiddleware, blockUser);

export default router;