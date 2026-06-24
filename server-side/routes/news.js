import express from "express";
import { getRealEstateNews } from "../controllers/newsController.js";

const router = express.Router();

// GET /api/news
// Fetch real-time real estate news
router.get("/", getRealEstateNews);

export default router;
