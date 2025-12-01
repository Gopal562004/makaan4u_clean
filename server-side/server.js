import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import compression from "compression"; // ⭐ GZIP compression

// Load env vars
dotenv.config();

// Import database connection
import connectDB from "./config/database.js";

// Import routes
import routes from "./routes/index.js";

// Import middleware
import { generalLimiter } from "./middlewares/rateLimit.js";

// Connect to database
connectDB();

const app = express();

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⭐ Updated Allowed Origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.1.35:3000",
  "http://172.17.144.1:3000",
  "https://makaan4u-clean.vercel.app",
];

// ⭐ CORS SHOULD BE FIRST MIDDLEWARE
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman / backend calls

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ⭐ Body Parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ⭐ Force HTTPS in Production (SEO Boost)
app.use((req, res, next) => {
  if (
    process.env.NODE_ENV === "production" &&
    req.headers["x-forwarded-proto"] !== "https"
  ) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// ⭐ Enable GZIP compression (Better SEO + Faster Pages)
app.use(compression());

// ⭐ Improve SEO and Performance with caching
// app.use((req, res, next) => {
//   res.set("Cache-Control", "public, max-age=86400"); // Cache for 1 day
//   next();
// });
// ❌ Disable all caching for all API responses
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});


// ⭐ Rate Limiter
app.use(generalLimiter);

// ⭐ Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ⭐ Serve SEO files (robots.txt, sitemap.xml) from public/
app.use(express.static(path.join(__dirname, "public")));

// ⭐ Routes
app.use("/", routes);

// ⭐ Root welcome
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Real Estate API is running!",
    version: "1.0.0",
  });
});

// ⭐ Cloudinary status
app.get("/cloudinary-status", (req, res) => {
  const cloudinaryConfig = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY
      ? "***" + process.env.CLOUDINARY_API_KEY.slice(-4)
      : "Missing",
    apiSecret: process.env.CLOUDINARY_API_SECRET
      ? "***" + process.env.CLOUDINARY_API_SECRET.slice(-4)
      : "Missing",
    hasAllCredentials: !!(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ),
  };

  res.json({
    success: true,
    cloudinary: cloudinaryConfig,
    usingLocalStorage: !cloudinaryConfig.hasAllCredentials,
  });
});

// ⭐ Health Check (Google SEO)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// ⭐ 404 handler
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ⭐ Global error handler
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 LAN: http://192.168.1.34:${PORT}`);
  console.log(`📁 Uploads: ${path.join(__dirname, "uploads")}`);
});
