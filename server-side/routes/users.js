import express from "express";
import {
  getProfile,
  updateProfile,
  updateAvatar,
  getAgents,
  getAgentProfile,
  getDashboardStats,
} from "../controllers/userController.js";
import { protect, authorize } from "../middlewares/auth.js";
import { uploadAvatar } from "../middlewares/cloudinary.js";

const router = express.Router();

// Public routes
router.get("/agents", getAgents);
router.get("/agents/:id", getAgentProfile);

// Protected routes
router.use(protect);

router.get("/profile", getProfile);
router.get("/dashboard-stats", getDashboardStats);
router.put("/profile", updateProfile);
router.put("/avatar", uploadAvatar, updateAvatar);

export default router;
