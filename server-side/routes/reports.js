import express from "express";
import {
  getReportsSummary,
  exportReports,
  downloadExportFile,
} from "../controllers/reportsController.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

// Admin-only middleware
router.use(protect);
router.use(authorize("admin"));

// Summary for dashboard
router.get("/summary", getReportsSummary);

// Export reports (Excel, CSV, PDF)
router.post("/export", exportReports);
router.get("/download/:filename", downloadExportFile);

export default router;
