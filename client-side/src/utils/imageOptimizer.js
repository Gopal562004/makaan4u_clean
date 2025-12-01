export const optimizeImageUrl = (url, options = {}) => {
  if (!url) return "/images/property-placeholder.jpg";

  const { width = 800, quality = 80, format = "webp" } = options;

  // If using Cloudinary
  if (url.includes("cloudinary.com")) {
    return `${url}?f=${format}&q=${quality}&w=${width}&c=fill`;
  }

  // If using Imgix
  if (url.includes("imgix.net")) {
    return `${url}?format=${format}&quality=${quality}&width=${width}&fit=crop`;
  }

  return url;
};

export const generateSrcSet = (url, sizes = [400, 800, 1200]) => {
  return sizes
    .map((size) => `${optimizeImageUrl(url, { width: size })} ${size}w`)
    .join(", ");
};
