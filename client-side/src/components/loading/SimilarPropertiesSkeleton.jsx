import React from "react";

const SimilarPropertiesSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Heading Skeleton */}
      <div className="h-7 bg-gray-200 rounded w-48"></div>

      {/* Properties Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg overflow-hidden animate-pulse"
          >
            {/* Image Skeleton */}
            <div className="relative h-48 bg-gray-200"></div>

            {/* Content Skeleton */}
            <div className="p-4 space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>

              {/* Price and Type */}
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>

              {/* Features */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
              </div>

              {/* Button */}
              <div className="h-9 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button Skeleton */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 px-6 py-2">
          <div className="h-5 bg-gray-200 rounded w-32"></div>
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SimilarPropertiesSkeleton;
