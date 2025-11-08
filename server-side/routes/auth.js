import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updateAvatar,
  
} from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";
import { uploadAvatar } from "../middlewares/cloudinary.js";
import { validateRegister, validateLogin } from "../middlewares/validation.js";
import { authLimiter } from "../middlewares/rateLimit.js";

const router = express.Router();

// Public routes
router.post("/register", authLimiter, validateRegister, register);
router.post("/login", authLimiter, validateLogin, login);

// Protected routes
router.use(protect);

router.get("/me", getMe);
router.get("/logout", logout);
router.put("/profile", updateProfile);
router.put("/avatar", uploadAvatar, updateAvatar);

export default router;
