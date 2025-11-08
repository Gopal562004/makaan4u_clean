// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// // Load env vars
// dotenv.config();

// // Import database connection
// import connectDB from "./config/database.js";

// // Import routes
// import routes from "./routes/index.js";

// // Import middleware
// import { generalLimiter } from "./middlewares/rateLimit.js";

// // Connect to database
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(generalLimiter);

// // Routes
// app.use("/", routes);

// // Welcome route
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Real Estate API is running!",
//     version: "1.0.0",
//   });
// });

// // Handle undefined routes
// app.all("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found`,
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Something went wrong!",
//     error: process.env.NODE_ENV === "production" ? {} : err.stack,
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

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

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // your React app
    credentials: true, // allow cookies or Authorization headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(generalLimiter);

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/", routes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Real Estate API is running!",
    version: "1.0.0",
  });
});
// Add this to your server.js or create a new route
app.get('/cloudinary-status', (req, res) => {
  const cloudinaryConfig = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'Missing',
    apiSecret: process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'Missing',
    hasAllCredentials: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
  };
  
  res.json({
    success: true,
    cloudinary: cloudinaryConfig,
    usingLocalStorage: !cloudinaryConfig.hasAllCredentials
  });
});
// Handle undefined routes
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(
    `📁 Local file uploads served from: ${path.join(__dirname, "uploads")}`
  );
});