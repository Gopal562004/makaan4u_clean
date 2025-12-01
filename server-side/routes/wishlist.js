import express from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  checkWishlistStatus,
} from "../controllers/wishlistController.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);
router.use(authorize("customer", "employee", "admin"));

router.post("/", addToWishlist);
router.get("/", getWishlist);
router.get("/:propertyId/status", checkWishlistStatus);
router.delete("/:propertyId", removeFromWishlist);

export default router;
