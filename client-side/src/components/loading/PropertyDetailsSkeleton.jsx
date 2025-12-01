import React from "react";

const PropertyDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Header Skeleton */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="w-32 h-8 bg-gray-200 rounded"></div>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-10 bg-gray-200 rounded"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="w-32 h-10 bg-gray-200 rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery Skeleton */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="aspect-[4/3] bg-gray-200 rounded-t-xl"></div>
              <div className="p-4">
                <div className="flex space-x-2 overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-20 h-16 bg-gray-200 rounded"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Actions Skeleton (Mobile) */}
            <div className="lg:hidden bg-white rounded-xl border border-border p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-gray-200 rounded-lg"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Tabs Skeleton */}
            <div className="border-b border-border">
              <div className="flex space-x-8">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 py-4 px-1"
                  >
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Content Skeleton */}
            <div className="min-h-[400px] bg-white rounded-xl border border-border p-6">
              {/* Property Title */}
              <div className="mb-6">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>

              {/* Amenities */}
              <div className="mt-8">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card Skeleton */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Property Actions Skeleton (Desktop) */}
            <div className="hidden lg:block bg-white rounded-xl border border-border p-6">
              <div className="h-12 bg-gray-200 rounded-lg mb-3"></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Quick Information Skeleton */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support Skeleton */}
            <div className="bg-muted/50 rounded-xl p-6 text-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetailsSkeleton;
