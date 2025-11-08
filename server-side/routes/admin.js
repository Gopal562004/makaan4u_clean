// import express from "express";
// import {
//   getDashboardStats,
//   manageUsers,
//   updateUserStatus,
//   exportDashboardData,
// } from "../controllers/adminController.js";
// import { protect, authorize } from "../middlewares/auth.js";

// const router = express.Router();

// // Admin only routes
// router.use(protect);
// router.use(authorize("admin"));

// router.get("/dashboard", getDashboardStats);
// router.get("/users", manageUsers);
// router.put("/users/:id", updateUserStatus);
// //router.get("/export", exportData);
// router.post("/export", exportDashboardData);

// export default router;
import express from "express";
import {
  getDashboardStats,
  manageUsers,
  updateUserStatus,
  exportDashboardData,
  getSalesTrend,
  getPropertyStatusOverview,
  getRecentActivity,
  getDataByDateRange,
  getQuickActionsSummary,
  exportReports,
  
} from "../controllers/adminController.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

// Admin-only middleware
router.use(protect);
router.use(authorize("admin"));

// Dashboard + Core
router.get("/dashboard", getDashboardStats);
router.post("/export", exportDashboardData);

// Extra features
router.get("/sales-trend", getSalesTrend);
router.get("/property-status", getPropertyStatusOverview);
router.get("/recent-activity", getRecentActivity);
router.get("/date-range", getDataByDateRange);
router.get("/quick-actions", getQuickActionsSummary);
router.post("/export-reports", exportReports);

// User management
router.get("/users", manageUsers);
router.put("/users/:id", updateUserStatus);

export default router;
