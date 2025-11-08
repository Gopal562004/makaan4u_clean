import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getNotificationStats,
} from "../controllers/notificationController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", getNotifications);
router.get("/stats", getNotificationStats);
router.put("/:id/read", markAsRead);
router.put("/mark-all-read", markAllAsRead);
router.delete("/:id", deleteNotification);

export default router;
