import express from "express";
import authRoutes from "./auth.js";
import propertyRoutes from "./properties.js";
import appointmentRoutes from "./appointments.js";
import userRoutes from "./users.js";
import contactRoutes from "./contact.js";
import reviewRoutes from "./reviews.js";
import wishlistRoutes from "./wishlist.js";
import notificationRoutes from "./notifications.js";
import leadRoutes from "./leads.js";
import adminRoutes from "./admin.js";
import reportRoutes from "./reports.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/properties", propertyRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/users", userRoutes);
router.use("/contact", contactRoutes);
router.use("/reviews", reviewRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/notifications", notificationRoutes);
router.use("/leads", leadRoutes);
router.use("/admin", adminRoutes);
router.use("/reports", reportRoutes);

export default router;
