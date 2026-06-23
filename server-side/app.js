import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import compression from "compression";
import cookieParser from "cookie-parser";
// Load env vars locally (Lambda uses environment directly)
dotenv.config();

// DB
import connectDB from "./config/database.js";

// Cloudinary (auto config on import)
import "./config/cloudinary.js";

// Routes & middleware
import routes from "./routes/index.js";
import { generalLimiter } from "./middlewares/rateLimit.js";
import { expressMiddleware } from "lognexis-node";

// Connect DB (cached for Lambda)
connectDB();

const app = express();

// ES module dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allowed Origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.1.35:3000",
  "http://172.17.144.1:3000",
  "https://makaan4u-clean.vercel.app",
];

// CORS (FIRST)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ⭐ LogNexis API Monitoring SDK
app.use(expressMiddleware({ 
  apiKey: process.env.MONITOR_API_KEY,
  debug: process.env.NODE_ENV === "development"
}));

// Compression
app.use(compression());

// Disable caching (API safety)
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Rate limiter
app.use(generalLimiter);

// Static files (uploads won’t persist on Lambda – OK)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", routes);

// Root
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Real Estate API is running!",
    version: "1.0.0",
  });
});

// Cloudinary status
app.get("/cloudinary-status", (req, res) => {
  res.json({
    success: true,
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      hasAllCredentials: !!(
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
      ),
    },
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// 404
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

export default app;
