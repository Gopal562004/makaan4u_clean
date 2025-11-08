import express from "express";
import {
  createContactInquiry,
  getMyInquiries,
  getAgentInquiries,
  updateInquiryStatus,
} from "../controllers/contactController.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

// Customer routes
router.post("/", authorize("customer"), createContactInquiry);
router.get("/my-inquiries", authorize("customer"), getMyInquiries);

// Agent/Admin routes
router.get(
  "/agent-inquiries",
  authorize("employee", "admin"),
  getAgentInquiries
);
router.put("/:id/status", authorize("employee", "admin"), updateInquiryStatus);

export default router;
