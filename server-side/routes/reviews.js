import express from "express";
import {
  createReview,
  getPropertyReviews,
  getAgentReviews,
  updateReview,
  deleteReview,
  markReviewHelpful,
} from "../controllers/reviewController.js";
import { protect, authorize, optionalAuth } from "../middlewares/auth.js";
import {
  uploadReviewImages,
  handleUploadError,
} from "../middlewares/cloudinary.js";

const router = express.Router();

// Public routes
router.get("/property/:propertyId", optionalAuth, getPropertyReviews);
router.get("/agent/:agentId", optionalAuth, getAgentReviews);

// Protected routes
router.use(protect);

router.post(
  "/",
  authorize("customer"),
  uploadReviewImages,
  handleUploadError,
  createReview
);

router.put(
  "/:id",
  authorize("customer"),
  uploadReviewImages,
  handleUploadError,
  updateReview
);

router.delete("/:id", authorize("customer", "admin"), deleteReview);
router.put("/:id/helpful", markReviewHelpful);

export default router;
