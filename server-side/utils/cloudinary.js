import { v2 as cloudinary } from "cloudinary";

// Upload image to Cloudinary
export const uploadToCloudinary = async (
  file,
  folder = "realestate/properties"
) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "auto",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

// Upload multiple images to Cloudinary
export const uploadMultipleToCloudinary = async (
  files,
  folder = "realestate/properties"
) => {
  try {
    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file.path, folder)
    );
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    throw new Error(`Multiple upload failed: ${error.message}`);
  }
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary delete failed: ${error.message}`);
  }
};

// Delete multiple images from Cloudinary
export const deleteMultipleFromCloudinary = async (publicIds) => {
  try {
    const deletePromises = publicIds.map((publicId) =>
      deleteFromCloudinary(publicId)
    );
    const results = await Promise.all(deletePromises);
    return results;
  } catch (error) {
    throw new Error(`Multiple delete failed: ${error.message}`);
  }
};

// Extract public_id from Cloudinary URL
export const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const matches = url.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
  return matches ? matches[1] : null;
};

// Optimize image URL for different sizes
export const getOptimizedImageUrl = (url, options = {}) => {
  const { width, height, quality = "auto", format = "webp" } = options;
  const publicId = getPublicIdFromUrl(url);

  if (!publicId) return url;

  return cloudinary.url(publicId, {
    transformation: [
      {
        width: width || null,
        height: height || null,
        quality,
        format,
        crop: "limit",
      },
    ],
  });
};
