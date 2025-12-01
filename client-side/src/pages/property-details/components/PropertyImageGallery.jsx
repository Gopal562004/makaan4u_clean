
import React, { useState, useMemo } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

// 🔥 IMPORT THE SAME IMAGE OPTIMIZER FROM YOUR UTILS
import { optimizeImageUrl } from "../../../utils/imageOptimizer";

const PropertyImageGallery = ({ images = [], propertyTitle = "" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // 🔥 USE THE SAME OPTIMIZATION LOGIC AS PROPERTY DETAILS
  const optimizedImages = useMemo(
    () =>
      images.map((img) => ({
        ...img,
        // Use the same optimization settings as PropertyDetails
        url: optimizeImageUrl(img.url, { width: 1200, quality: 85 }),
        thumbnailUrl: optimizeImageUrl(img.url, { width: 200, quality: 70 }),
      })),
    [images]
  );

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % optimizedImages?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + optimizedImages?.length) % optimizedImages?.length
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  // Generate SEO-friendly alt text
  const generateAltText = (image, index) => {
    if (image?.alt) return image.alt;

    const positions = [
      "Main view",
      "Living area",
      "Bedroom",
      "Kitchen",
      "Bathroom",
      "Exterior",
      "Garden",
      "Parking",
    ];
    const position = positions[index] || `View ${index + 1}`;
    const propertyType = propertyTitle.toLowerCase().includes("apartment")
      ? "apartment"
      : propertyTitle.toLowerCase().includes("villa")
      ? "villa"
      : propertyTitle.toLowerCase().includes("house")
      ? "house"
      : "property";

    return `${position} of ${propertyTitle} - ${propertyType} showing interior design, amenities and features`;
  };

  // Generate structured data for images
  const generateImageStructuredData = () => {
    if (!optimizedImages.length) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: `${propertyTitle} - Property Photo Gallery`,
      description: `High-quality images of ${propertyTitle} showing interior design, exterior views, amenities, bedrooms, bathrooms, kitchen, living area and property features`,
      numberOfItems: optimizedImages.length,
      mainEntity: optimizedImages.map((image, index) => ({
        "@type": "ImageObject",
        position: index + 1,
        name: generateAltText(image, index),
        description: generateAltText(image, index),
        contentUrl: image.url, // Use the optimized URL
        thumbnailUrl: image.thumbnailUrl,
        acquireLicensePage: window.location.href,
        copyrightNotice: `Copyright ${new Date().getFullYear()} Premium Real Estate Platform`,
        creator: {
          "@type": "Organization",
          name: "Premium Real Estate Platform",
        },
      })),
    };
  };

  if (!optimizedImages?.length) {
    return (
      <div
        className="w-full h-96 bg-muted rounded-lg flex items-center justify-center"
        itemScope
        itemType="https://schema.org/Photograph"
      >
        <div className="text-center">
          <Icon
            name="ImageOff"
            size={48}
            className="text-muted-foreground mx-auto mb-2"
          />
          <p className="text-muted-foreground">No images available</p>
          <meta
            itemProp="name"
            content={`${propertyTitle} - No Images Available`}
          />
        </div>
      </div>
    );
  }

  const currentImage = optimizedImages[currentImageIndex];

  return (
    <div className="space-y-4">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateImageStructuredData()),
        }}
      />

      {/* Main Image */}
      <div className="relative group">
        <div
          className="relative w-full h-96 lg:h-[500px] overflow-hidden rounded-lg bg-muted"
          itemScope
          itemType="https://schema.org/ImageObject"
        >
          <Image
            src={currentImage.url} // Use the optimized URL
            alt={generateAltText(currentImage, currentImageIndex)}
            className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            onClick={toggleZoom}
            onLoad={() => handleImageLoad(currentImageIndex)}
            loading={currentImageIndex === 0 ? "eager" : "lazy"}
            itemProp="contentUrl"
          />

          {/* SEO Meta for Main Image */}
          <meta
            itemProp="name"
            content={generateAltText(currentImage, currentImageIndex)}
          />
          <meta
            itemProp="description"
            content={generateAltText(currentImage, currentImageIndex)}
          />
          <meta itemProp="position" content={currentImageIndex + 1} />

          {/* Navigation Arrows */}
          {optimizedImages?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                aria-label="Previous image"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                aria-label="Next image"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div
            className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm"
            aria-live="polite"
            aria-atomic="true"
          >
            {currentImageIndex + 1} / {optimizedImages?.length}
          </div>

          {/* Zoom Icon */}
          <button
            onClick={toggleZoom}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={20} />
          </button>

          {/* Loading State */}
          {!loadedImages.has(currentImageIndex) && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-center">
                <Icon name="Image" size={32} className="text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm">
                  Loading high-quality image...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {optimizedImages?.length > 1 && (
        <div
          className="flex space-x-2 overflow-x-auto pb-2"
          role="tablist"
          aria-label="Property image thumbnails"
        >
          {optimizedImages?.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? "border-primary"
                  : "border-transparent hover:border-border"
              }`}
              role="tab"
              aria-selected={index === currentImageIndex}
              aria-label={`View image ${index + 1}: ${generateAltText(
                image,
                index
              )}`}
              aria-controls="main-image"
            >
              <Image
                src={image.thumbnailUrl}
                alt={`Thumbnail: ${generateAltText(image, index)}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
              />

              {/* Loading state for thumbnails */}
              {!loadedImages.has(index) && (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image SEO Description */}
      <div className="sr-only" aria-live="polite">
        <p>
          Property image gallery with {optimizedImages.length} high-quality
          images showing different views of {propertyTitle}.
        </p>
        <p>
          Currently viewing image {currentImageIndex + 1} of{" "}
          {optimizedImages.length}:{" "}
          {generateAltText(currentImage, currentImageIndex)}.
        </p>
      </div>
    </div>
  );
};

export default React.memo(PropertyImageGallery);