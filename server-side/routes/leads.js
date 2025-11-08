import express from "express";
import {
  createLead,
  getLeads,
  updateLeadStatus,
  assignLead,
  convertLeadToAppointment,
  getLeadStats,
} from "../controllers/leadController.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

// Public lead creation (for website forms)
router.post("/", createLead);

// Protected routes
router.use(protect);

router.get("/", authorize("employee", "admin"), getLeads);
router.get("/stats", authorize("employee", "admin"), getLeadStats);
router.put("/:id/status", authorize("employee", "admin"), updateLeadStatus);
router.put("/:id/assign", authorize("admin"), assignLead);
router.put(
  "/:id/convert",
  authorize("employee", "admin"),
  convertLeadToAppointment
);

export default router;
