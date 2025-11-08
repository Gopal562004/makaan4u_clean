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
//           {Array.from({ length: 6 })?.map((_, index) => (
//             <div
//               key={index}
//               className="bg-card border border-border rounded-lg overflow-hidden animate-pulse"
//             >
//               <div className="h-48 bg-muted"></div>
//               <div className="p-4 space-y-3">
//                 <div className="h-4 bg-muted rounded w-3/4"></div>
//                 <div className="h-3 bg-muted rounded w-1/2"></div>
//                 <div className="flex space-x-4">
//                   <div className="h-3 bg-muted rounded w-16"></div>
//                   <div className="h-3 bg-muted rounded w-16"></div>
//                   <div className="h-3 bg-muted rounded w-16"></div>
//                 </div>
//                 <div className="h-6 bg-muted rounded w-24"></div>
//                 <div className="flex space-x-2">
//                   <div className="h-8 bg-muted rounded flex-1"></div>
//                   <div className="h-8 bg-muted rounded flex-1"></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!properties || properties?.length === 0) {
//     return (
//       <div className="flex-1 flex items-center justify-center p-12">
//         <div className="text-center max-w-md">
//           <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
//             <Icon name="Search" size={32} className="text-muted-foreground" />
//           </div>
//           <h3 className="text-xl font-semibold text-foreground mb-2">
//             No Properties Found
//           </h3>
//           <p className="text-muted-foreground mb-6">
//             We couldn't find any properties matching your search criteria. Try
//             adjusting your filters or search terms.
//           </p>
//           <div className="space-y-2 text-sm text-muted-foreground">
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
//         {properties?.map((property) => (
//           <PropertyCard
//             key={property?.id}
//             property={property}
//             viewMode={viewMode}
//             onWishlistToggle={onWishlistToggle}
//             isWishlisted={wishlistedProperties?.includes(property?.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PropertyGrid;
import React from "react";
import PropertyCard from "./PropertyCard";
import Icon from "../../../components/AppIcon";

const PropertyGrid = ({
  properties,
  viewMode = "grid",
  onWishlistToggle,
  wishlistedProperties = [],
  loading = false,
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
            key={property._id || property.id || property.propertyId} // Use _id first (MongoDB default)
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
  );
};

export default React.memo(PropertyGrid);