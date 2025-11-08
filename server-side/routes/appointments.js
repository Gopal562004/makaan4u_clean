import express from "express";
import {
  createAppointment,
  getMyAppointments,
  getAppointment,
  updateAppointmentStatus,
  cancelAppointment,
  getAppointmentStats,
} from "../controllers/appointmentController.js";
import { protect, authorize } from "../middlewares/auth.js";
import { validateAppointment } from "../middlewares/validation.js";
import { appointmentLimiter } from "../middlewares/rateLimit.js";

const router = express.Router();

router.use(protect);

// Customer routes
router.post(
  "/",
  authorize("customer"),
  appointmentLimiter,
  validateAppointment,
  createAppointment
);

router.get("/my-appointments", getMyAppointments);
router.get("/stats", getAppointmentStats);
router.get("/:id", getAppointment);
router.put("/:id/cancel", cancelAppointment);

// Employee/Admin routes
router.put(
  "/:id/status",
  authorize("employee", "admin"),
  updateAppointmentStatus
);

export default router;
