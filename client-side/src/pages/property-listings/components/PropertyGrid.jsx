// import React from "react";
// import PropertyCard from "./PropertyCard";
// import Icon from "../../../components/AppIcon";

// const PropertyGrid = ({
//   properties,
//   viewMode = "grid",
//   onWishlistToggle,
//   wishlistedProperties = [],
//   loading = false,
// }) => {
//   if (loading) {
//     return (
//       <div className="flex-1 p-6">
//         <div
//           className={`grid gap-6 ${
//             viewMode === "grid"
//               ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
//               : "grid-cols-1"
//           }`}
//         >
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div
//               key={`skeleton-${index}`}
//               className="bg-white border border-slate-200 rounded-lg overflow-hidden animate-pulse"
//             >
//               <div className="h-48 bg-slate-200"></div>
//               <div className="p-4 space-y-3">
//                 <div className="h-4 bg-slate-200 rounded w-3/4"></div>
//                 <div className="h-3 bg-slate-200 rounded w-1/2"></div>
//                 <div className="flex space-x-4">
//                   <div className="h-3 bg-slate-200 rounded w-16"></div>
//                   <div className="h-3 bg-slate-200 rounded w-16"></div>
//                   <div className="h-3 bg-slate-200 rounded w-16"></div>
//                 </div>
//                 <div className="h-6 bg-slate-200 rounded w-24"></div>
//                 <div className="flex space-x-2">
//                   <div className="h-8 bg-slate-200 rounded flex-1"></div>
//                   <div className="h-8 bg-slate-200 rounded flex-1"></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!properties || properties.length === 0) {
//     return (
//       <div className="flex-1 flex items-center justify-center p-12">
//         <div className="text-center max-w-md">
//           <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Icon name="Search" size={32} className="text-slate-400" />
//           </div>
//           <h3 className="text-xl font-semibold text-slate-900 mb-2">
//             No Properties Found
//           </h3>
//           <p className="text-slate-600 mb-6">
//             We couldn't find any properties matching your search criteria. Try
//             adjusting your filters or search terms.
//           </p>
//           <div className="space-y-2 text-sm text-slate-500">
//             <p>• Try different location keywords</p>
//             <p>• Adjust your price range</p>
//             <p>• Remove some filters</p>
//             <p>• Check spelling of search terms</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 p-6">
//       <div
//         className={`grid gap-6 ${
//           viewMode === "grid"
//             ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
//             : "grid-cols-1"
//         }`}
//       >
//         {properties.map((property) => (
//           <PropertyCard
//             key={property._id || property.id || property.propertyId} // Use _id first (MongoDB default)
//             property={property}
//             viewMode={viewMode}
//             onWishlistToggle={onWishlistToggle}
//             isWishlisted={wishlistedProperties.includes(
//               property._id || property.id
//             )}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default React.memo(PropertyGrid);
import React from "react";
import PropertyCard from "./PropertyCard";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PropertyGrid = ({
  properties,
  viewMode = "grid",
  onWishlistToggle,
  wishlistedProperties = [],
  loading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-slate-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                <div className="flex space-x-4">
                  <div className="h-3 bg-slate-200 rounded w-16"></div>
                  <div className="h-3 bg-slate-200 rounded w-16"></div>
                  <div className="h-3 bg-slate-200 rounded w-16"></div>
                </div>
                <div className="h-6 bg-slate-200 rounded w-24"></div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-slate-200 rounded flex-1"></div>
                  <div className="h-8 bg-slate-200 rounded flex-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={32} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No Properties Found
          </h3>
          <p className="text-slate-600 mb-6">
            We couldn't find any properties matching your search criteria. Try
            adjusting your filters or search terms.
          </p>
          <div className="space-y-2 text-sm text-slate-500">
            <p>• Try different location keywords</p>
            <p>• Adjust your price range</p>
            <p>• Remove some filters</p>
            <p>• Check spelling of search terms</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-0">
      {/* Properties Grid */}
      <div className="flex-1 p-6">
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {properties.map((property) => (
            <PropertyCard
              key={property._id || property.id || property.propertyId}
              property={property}
              viewMode={viewMode}
              onWishlistToggle={onWishlistToggle}
              isWishlisted={wishlistedProperties.includes(
                property._id || property.id
              )}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
                iconPosition="left"
                size="sm"
              >
                Previous
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">
                Page <span className="font-semibold">{currentPage}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right"
                size="sm"
              >
                Next
              </Button>
            </div>
          </div>

          {/* Page Numbers for Desktop */}
          <div className="hidden sm:flex items-center justify-center space-x-1 mt-4">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              // Show first 3 pages, current page with neighbors, and last 3 pages
              let pageNum;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (currentPage <= 4) {
                pageNum = i + 1;
                if (i === 6) pageNum = totalPages;
                else if (i === 5) pageNum = "...";
              } else if (currentPage >= totalPages - 3) {
                if (i === 0) pageNum = 1;
                else if (i === 1) pageNum = "...";
                else pageNum = totalPages - (6 - i);
              } else {
                if (i === 0) pageNum = 1;
                else if (i === 1) pageNum = "...";
                else if (i === 5) pageNum = "...";
                else if (i === 6) pageNum = totalPages;
                else pageNum = currentPage - 2 + (i - 2);
              }

              if (pageNum === "...") {
                return (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-3 py-2 text-sm text-slate-500"
                  >
                    ...
                  </span>
                );
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "primary" : "outline"}
                  onClick={() => onPageChange(pageNum)}
                  size="sm"
                  className="min-w-[40px] px-3 py-2"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(PropertyGrid);