import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const PropertyImageGallery = ({ images = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + images?.length) % images?.length
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!images?.length) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Icon
            name="ImageOff"
            size={48}
            className="text-muted-foreground mx-auto mb-2"
          />
          <p className="text-muted-foreground">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <div className="relative w-full h-96 lg:h-[500px] overflow-hidden rounded-lg bg-muted">
          <Image
            src={images?.[currentImageIndex]?.url}
            alt={images?.[currentImageIndex]?.alt}
            className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            onClick={toggleZoom}
          />

          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images?.length}
          </div>

          {/* Zoom Icon */}
          <button
            onClick={toggleZoom}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={20} />
          </button>
        </div>
      </div>
      {/* Thumbnail Strip */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? "border-primary"
                  : "border-transparent hover:border-border"
              }`}
            >
              <Image
                src={image?.url}
                alt={image?.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyImageGallery;
