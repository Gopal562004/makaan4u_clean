import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary, { isCloudinaryConfigured } from "../config/cloudinary.js";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists (for fallback)
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create storage based on Cloudinary status
const createStorage = () => {
  if (isCloudinaryConfigured) {
    console.log("🚀 CLOUDINARY ACTIVE - Images will upload to Cloudinary");
    return new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: "realestate/properties",
        format: "webp",
        transformation: [
          { width: 1200, height: 800, crop: "limit", quality: "auto" },
        ],
        public_id: (req, file) => {
          return `property-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        },
      },
    });
  } else {
    console.log("📁 CLOUDINARY INACTIVE - Using local storage");
    return multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadsDir);
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, "property-" + uniqueSuffix + ext);
      },
    });
  }
};

const storage = createStorage();

// Create avatar storage (separate configuration for avatars)
const createAvatarStorage = () => {
  if (isCloudinaryConfigured) {
    console.log("🚀 CLOUDINARY ACTIVE - Avatars will upload to Cloudinary");
    return new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: "realestate/avatars",
        format: "webp",
        transformation: [
          {
            width: 300,
            height: 300,
            crop: "thumb",
            gravity: "face",
            quality: "auto",
          },
        ],
        public_id: (req, file) => {
          return `avatar-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        },
      },
    });
  } else {
    console.log("📁 CLOUDINARY INACTIVE - Avatars using local storage");
    return multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadsDir);
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, "avatar-" + uniqueSuffix + ext);
      },
    });
  }
};

const avatarStorage = createAvatarStorage();

// Create review images storage (separate configuration for review images)
const createReviewStorage = () => {
  if (isCloudinaryConfigured) {
    console.log(
      "🚀 CLOUDINARY ACTIVE - Review images will upload to Cloudinary"
    );
    return new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: "realestate/reviews",
        format: "webp",
        transformation: [
          { width: 800, height: 600, crop: "limit", quality: "auto" },
        ],
        public_id: (req, file) => {
          return `review-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        },
      },
    });
  } else {
    console.log("📁 CLOUDINARY INACTIVE - Review images using local storage");
    return multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadsDir);
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, "review-" + uniqueSuffix + ext);
      },
    });
  }
};

const reviewStorage = createReviewStorage();

// File filter
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Upload instances
export const uploadPropertyImages = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB for property images
  },
}).array("images", 10); // Max 10 images for properties

export const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit for avatars
  },
}).single("avatar"); // Single file for avatar

export const uploadReviewImages = multer({
  storage: reviewStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB limit for review images
  },
}).array("reviewImages", 5); // Max 5 images for reviews

// Error handling
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      let message = "File too large.";
      if (req.route.path === "/avatar") {
        message += " Maximum size is 2MB for avatars.";
      } else if (req.route.path.includes("/reviews")) {
        message += " Maximum size is 3MB for review images.";
      } else {
        message += " Maximum size is 5MB for property images.";
      }
      return res.status(400).json({
        success: false,
        message,
      });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      let message = "Too many files.";
      if (req.route.path.includes("/reviews")) {
        message += " Maximum 5 images allowed for reviews.";
      } else {
        message += " Maximum 10 images allowed for properties.";
      }
      return res.status(400).json({
        success: false,
        message,
      });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: "Unexpected field name for file upload",
      });
    }
  }

  // Handle Cloudinary-specific errors
  if (
    error.message.includes("cloud_name") ||
    error.message.includes("Invalid")
  ) {
    return res.status(500).json({
      success: false,
      message:
        "Image upload service is currently unavailable. Please try again later.",
    });
  }

  next(error);
};