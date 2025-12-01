import express from "express";
import {
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getAgentProperties,
  getFilterOptions,
  getAvailableAgents,
} from "../controllers/propertyController.js";
import { protect, authorize, optionalAuth } from "../middlewares/auth.js";
import {
  uploadPropertyImages,
  handleUploadError,
} from "../middlewares/cloudinary.js";
import { validateProperty } from "../middlewares/validation.js";
import { propertyLimiter } from "../middlewares/rateLimit.js";

const router = express.Router();

// Public routes
router.get("/", optionalAuth, getAllProperties);
router.get("/featured", getFeaturedProperties);
router.get("/filter-options", getFilterOptions);
router.get("/agent/:agentId", getAgentProperties);
//router.get("/:id", optionalAuth, getProperty);
router.get("/agents/available", getAvailableAgents);
router.get("/:slug", optionalAuth, getProperty);
// Protected routes - only employees and admins can create/update/delete
router.use(protect);

router.post(
  "/",
  authorize("employee", "admin"),
  propertyLimiter,
  uploadPropertyImages,
  handleUploadError,
  //validateProperty,
  createProperty
);

router.put(
  "/:id",
  authorize("employee", "admin"),
  uploadPropertyImages,
  handleUploadError,
  updateProperty
);

router.delete("/:id", authorize("employee", "admin"), deleteProperty);

export default router;