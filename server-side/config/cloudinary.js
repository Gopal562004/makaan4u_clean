import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

let isCloudinaryConfigured = false;
let cloudinaryError = null;

// Configure immediately
const configureCloudinary = () => {
  try {
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      console.log("✅ Cloudinary configured successfully");
      isCloudinaryConfigured = true;
      return true;
    } else {
      console.log("❌ Cloudinary credentials missing");
      return false;
    }
  } catch (error) {
    console.log("❌ Cloudinary configuration error:", error.message);
    isCloudinaryConfigured = false;
    return false;
  }
};

// Configure immediately on import
configureCloudinary();

export { isCloudinaryConfigured, cloudinaryError };
export default cloudinary;
