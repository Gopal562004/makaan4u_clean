// // import React from "react";
// // import Icon from "../../../components/AppIcon";

// // const PropertyInfo = ({ property }) => {
// //   const formatPrice = (price) => {
// //     if (price >= 10000000) {
// //       return `₹${(price / 10000000)?.toFixed(1)} Cr`;
// //     } else if (price >= 100000) {
// //       return `₹${(price / 100000)?.toFixed(1)} L`;
// //     }
// //     return `₹${price?.toLocaleString("en-IN")}`;
// //   };

// //   const specifications = [
// //     { icon: "Bed", label: "Bedrooms", value: property?.bedrooms },
// //     { icon: "Bath", label: "Bathrooms", value: property?.bathrooms },
// //     { icon: "Square", label: "Area", value: `${property?.area} sq ft` },
// //     { icon: "Building2", label: "Type", value: property?.type },
// //     { icon: "Calendar", label: "Built Year", value: property?.builtYear },
// //     { icon: "Car", label: "Parking", value: property?.parking },
// //   ];

// //   return (
// //     <div className="space-y-6">
// //       {/* Title and Price */}
// //       <div>
// //         <h1 className="text-3xl font-bold text-foreground mb-2">
// //           {property?.title}
// //         </h1>
// //         <div className="flex items-center space-x-4 mb-4">
// //           <span className="text-3xl font-bold text-primary">
// //             {formatPrice(property?.price)}
// //           </span>
// //           {property?.originalPrice &&
// //             property?.originalPrice > property?.price && (
// //               <span className="text-lg text-muted-foreground line-through">
// //                 {formatPrice(property?.originalPrice)}
// //               </span>
// //             )}
// //         </div>
// //         <div className="flex items-center text-muted-foreground">
// //           <Icon name="MapPin" size={16} className="mr-1" />
// //           <span>{property?.location}</span>
// //         </div>
// //       </div>
// //       {/* Property Status */}
// //       <div className="flex items-center space-x-2">
// //         <span
// //           className={`px-3 py-1 rounded-full text-sm font-medium ${
// //             property?.status === "available"
// //               ? "bg-success/10 text-success"
// //               : property?.status === "sold"
// //               ? "bg-error/10 text-error"
// //               : "bg-warning/10 text-warning"
// //           }`}
// //         >
// //           {property?.status === "available"
// //             ? "Available"
// //             : property?.status === "sold"
// //             ? "Sold"
// //             : "Under Contract"}
// //         </span>
// //         {property?.featured && (
// //           <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
// //             Featured
// //           </span>
// //         )}
// //       </div>
// //       {/* Specifications Grid */}
// //       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
// //         {specifications?.map((spec, index) => (
// //           <div key={index} className="bg-muted/50 rounded p-4 text-center">
// //             <Icon
// //               name={spec?.icon}
// //               size={24}
// //               className="text-primary mx-auto mb-2"
// //             />
// //             <p className="text-sm text-muted-foreground">{spec?.label}</p>
// //             <p className="font-semibold text-foreground">{spec?.value}</p>
// //           </div>
// //         ))}
// //       </div>
// //       {/* Description */}
// //       <div>
// //         <h3 className="text-xl font-semibold text-foreground mb-3">
// //           Description
// //         </h3>
// //         <p className="text-muted-foreground leading-relaxed">
// //           {property?.description}
// //         </p>
// //       </div>
// //       {/* Amenities */}
// //       {property?.amenities && property?.amenities?.length > 0 && (
// //         <div>
// //           <h3 className="text-xl font-semibold text-foreground mb-3">
// //             Amenities
// //           </h3>
// //           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
// //             {property?.amenities?.map((amenity, index) => (
// //               <div key={index} className="flex items-center space-x-2">
// //                 <Icon name="Check" size={16} className="text-success" />
// //                 <span className="text-muted-foreground">{amenity}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //       {/* Property Features */}
// //       {property?.features && property?.features?.length > 0 && (
// //         <div>
// //           <h3 className="text-xl font-semibold text-foreground mb-3">
// //             Key Features
// //           </h3>
// //           <ul className="space-y-2">
// //             {property?.features?.map((feature, index) => (
// //               <li key={index} className="flex items-start space-x-2">
// //                 <Icon name="Star" size={16} className="text-warning mt-0.5" />
// //                 <span className="text-muted-foreground">{feature}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PropertyInfo;
// import React from "react";
// import Icon from "../../../components/AppIcon";

// const PropertyInfo = ({ property }) => {
//   // Enhanced price formatting
//   const formatPrice = (price) => {
//     if (!price || price === 0) return "Price on Request";
//     if (price >= 10000000) {
//       const crorePrice = price / 10000000;
//       return `₹${
//         crorePrice % 1 === 0 ? crorePrice.toFixed(0) : crorePrice.toFixed(1)
//       } Cr`;
//     }
//     if (price >= 100000) {
//       const lakhPrice = price / 100000;
//       return `₹${
//         lakhPrice % 1 === 0 ? lakhPrice.toFixed(0) : lakhPrice.toFixed(1)
//       } L`;
//     }
//     return `₹${price?.toLocaleString("en-IN")}`;
//   };

//   // Calculate price per sq ft
//   const getPricePerSqFt = () => {
//     if (!property?.price || !property?.area || property.area === 0) return null;
//     const pricePerSqFt = Math.round(property.price / property.area);
//     return `₹${pricePerSqFt?.toLocaleString("en-IN")} per sq ft`;
//   };

//   // Format location details
//   const formatLocation = () => {
//     if (!property?.location) return "Location not specified";

//     if (typeof property.location === "string") {
//       return property.location;
//     }

//     const parts = [
//       property.location?.address,
//       property.location?.landmark,
//       property.location?.locality,
//       property.location?.city,
//       property.location?.state,
//       property.location?.pincode,
//     ].filter(Boolean);

//     return parts.join(", ");
//   };

//   // Main specifications
//   const mainSpecifications = [
//     {
//       icon: "Bed",
//       label: "Bedrooms",
//       value: property?.bedrooms || "Not specified",
//       suffix: property?.bedrooms ? " Beds" : "",
//     },
//     {
//       icon: "Bath",
//       label: "Bathrooms",
//       value: property?.bathrooms || "Not specified",
//       suffix: property?.bathrooms ? " Baths" : "",
//     },
//     {
//       icon: "Square",
//       label: "Carpet Area",
//       value: property?.area
//         ? `${property.area.toLocaleString("en-IN")} sq ft`
//         : "Not specified",
//     },
//     {
//       icon: "Building2",
//       label: "Property Type",
//       value: property?.type || "Not specified",
//     },
//   ];

//   // Additional specifications
//   const additionalSpecifications = [
//     { icon: "Calendar", label: "Built Year", value: property?.builtYear },
//     { icon: "Car", label: "Parking", value: property?.parking },
//     { icon: "Floor", label: "Floor", value: property?.floor },
//     { icon: "Layers", label: "Total Floors", value: property?.totalFloors },
//     { icon: "Compass", label: "Facing", value: property?.facing },
//     { icon: "Home", label: "Ownership", value: property?.ownershipType },
//     { icon: "Clock", label: "Age of Property", value: property?.propertyAge },
//     {
//       icon: "Ruler",
//       label: "Plot Area",
//       value: property?.plotArea ? `${property.plotArea} sq ft` : null,
//     },
//   ].filter((spec) => spec.value); // Only show if value exists

//   // Property status configuration
//   const getStatusInfo = () => {
//     const status = property?.status || "available";
//     const statusConfig = {
//       available: {
//         label: "Available",
//         color: "bg-success/20 text-success border-success/30",
//         icon: "CheckCircle",
//       },
//       sold: {
//         label: "Sold",
//         color: "bg-error/20 text-error border-error/30",
//         icon: "XCircle",
//       },
//       rented: {
//         label: "Rented",
//         color: "bg-warning/20 text-warning border-warning/30",
//         icon: "Clock",
//       },
//       "under-construction": {
//         label: "Under Construction",
//         color: "bg-info/20 text-info border-info/30",
//         icon: "Construction",
//       },
//       "under-maintenance": {
//         label: "Under Maintenance",
//         color: "bg-muted/20 text-muted border-muted/30",
//         icon: "Tool",
//       },
//     };

//     return statusConfig[status] || statusConfig.available;
//   };

//   const statusInfo = getStatusInfo();

//   return (
//     <div className="space-y-8">
//       {/* Header Section */}
//       <div className="space-y-4">
//         {/* Title */}
//         <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
//           {property?.title || "Property Title Not Available"}
//         </h1>

//         {/* Price Section */}
//         <div className="space-y-3">
//           <div className="flex flex-wrap items-baseline gap-3">
//             <span className="text-3xl lg:text-4xl font-bold text-primary">
//               {formatPrice(property?.price)}
//             </span>

//             {/* Original Price with Discount */}
//             {property?.originalPrice &&
//               property?.originalPrice > property?.price && (
//                 <div className="flex items-center gap-2">
//                   <span className="text-xl text-muted-foreground line-through">
//                     {formatPrice(property?.originalPrice)}
//                   </span>
//                   <span className="px-2 py-1 bg-success/20 text-success text-sm font-medium rounded-full">
//                     {Math.round(
//                       ((property.originalPrice - property.price) /
//                         property.originalPrice) *
//                         100
//                     )}
//                     % Off
//                   </span>
//                 </div>
//               )}
//           </div>

//           {/* Price per sq ft */}
//           {getPricePerSqFt() && (
//             <p className="text-lg text-muted-foreground font-medium">
//               {getPricePerSqFt()}
//             </p>
//           )}
//         </div>

//         {/* Location */}
//         <div className="flex items-start text-muted-foreground">
//           <Icon name="MapPin" size={20} className="mr-2 mt-0.5 flex-shrink-0" />
//           <span className="text-lg leading-relaxed">{formatLocation()}</span>
//         </div>
//       </div>

//       {/* Status & Tags */}
//       <div className="flex flex-wrap items-center gap-3">
//         {/* Status Badge */}
//         <div
//           className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${statusInfo.color}`}
//         >
//           <Icon name={statusInfo.icon} size={16} />
//           <span className="font-semibold">{statusInfo.label}</span>
//         </div>

//         {/* Featured Badge */}
//         {property?.featured && (
//           <div className="flex items-center space-x-2 px-4 py-2 bg-accent/20 text-accent rounded-full border border-accent/30">
//             <Icon name="Star" size={16} fill="currentColor" />
//             <span className="font-semibold">Featured</span>
//           </div>
//         )}

//         {/* Verified Badge */}
//         {property?.verified && (
//           <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-600 rounded-full border border-blue-500/30">
//             <Icon name="Verified" size={16} />
//             <span className="font-semibold">Verified</span>
//           </div>
//         )}

//         {/* Immediate Possession */}
//         {property?.immediatePossession && (
//           <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-600 rounded-full border border-green-500/30">
//             <Icon name="Zap" size={16} />
//             <span className="font-semibold">Immediate Possession</span>
//           </div>
//         )}
//       </div>

//       {/* Main Specifications Grid */}
//       <div className="bg-muted/30 rounded-md p-6">
//         <h3 className="text-xl font-semibold text-foreground mb-4">
//           Key Specifications
//         </h3>
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {mainSpecifications.map((spec, index) => (
//             <div
//               key={index}
//               className="text-center p-4 bg-background rounded hover:shadow-md transition-shadow"
//             >
//               <Icon
//                 name={spec.icon}
//                 size={28}
//                 className="text-primary mx-auto mb-3"
//               />
//               <p className="text-sm text-muted-foreground mb-1">{spec.label}</p>
//               <p className="font-semibold text-foreground text-lg">
//                 {spec.value}
//                 {spec.suffix}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Additional Specifications */}
//       {additionalSpecifications.length > 0 && (
//         <div>
//           <h3 className="text-xl font-semibold text-foreground mb-4">
//             Additional Details
//           </h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {additionalSpecifications.map((spec, index) => (
//               <div
//                 key={index}
//                 className="flex items-center space-x-3 p-3 bg-muted/30 rounded"
//               >
//                 <Icon
//                   name={spec.icon}
//                   size={20}
//                   className="text-primary flex-shrink-0"
//                 />
//                 <div>
//                   <p className="text-sm text-muted-foreground">{spec.label}</p>
//                   <p className="font-semibold text-foreground">{spec.value}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Description */}
//       {property?.description && (
//         <div className="bg-muted/30 rounded-md p-6">
//           <h3 className="text-xl font-semibold text-foreground mb-4">
//             Property Description
//           </h3>
//           <div className="prose prose-lg max-w-none">
//             <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
//               {property.description}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Amenities */}
//       {property?.amenities && property.amenities.length > 0 && (
//         <div className="bg-muted/30 rounded-md p-6">
//           <h3 className="text-xl font-semibold text-foreground mb-4">
//             Amenities & Facilities
//           </h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {property.amenities.map((amenity, index) => (
//               <div
//                 key={index}
//                 className="flex items-center space-x-3 p-3 bg-background rounded hover:shadow-sm transition-shadow"
//               >
//                 <Icon
//                   name="CheckCircle"
//                   size={18}
//                   className="text-success flex-shrink-0"
//                 />
//                 <span className="text-foreground font-medium">{amenity}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Key Features */}
//       {property?.features && property.features.length > 0 && (
//         <div className="bg-muted/30 rounded-md p-6">
//           <h3 className="text-xl font-semibold text-foreground mb-4">
//             Key Features & Highlights
//           </h3>
//           <ul className="space-y-3">
//             {property.features.map((feature, index) => (
//               <li
//                 key={index}
//                 className="flex items-start space-x-3 p-3 bg-background rounded hover:shadow-sm transition-shadow"
//               >
//                 <Icon
//                   name="Star"
//                   size={18}
//                   className="text-warning mt-0.5 flex-shrink-0"
//                   fill="currentColor"
//                 />
//                 <span className="text-foreground leading-relaxed">
//                   {feature}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Additional Information */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Property ID */}
//         {property?.propertyId && (
//           <div className="bg-muted/30 rounded-md p-6">
//             <h3 className="text-lg font-semibold text-foreground mb-2">
//               Property ID
//             </h3>
//             <p className="text-muted-foreground font-mono">
//               {property.propertyId}
//             </p>
//           </div>
//         )}

//         {/* Last Updated */}
//         {property?.lastUpdated && (
//           <div className="bg-muted/30 rounded-md p-6">
//             <h3 className="text-lg font-semibold text-foreground mb-2">
//               Last Updated
//             </h3>
//             <p className="text-muted-foreground">
//               {new Date(property.lastUpdated).toLocaleDateString("en-IN", {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//               })}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Disclaimer */}
//       <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
//         <div className="flex items-start space-x-3">
//           <Icon
//             name="Info"
//             size={20}
//             className="text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0"
//           />
//           <div>
//             <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
//               Disclaimer
//             </p>
//             <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
//               All information provided is based on data received from the
//               property owner/agent. Please verify all details during site
//               visits. Prices and availability are subject to change without
//               prior notice.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyInfo;

import React from "react";
import Icon from "../../../components/AppIcon";
import { useCurrencyFormatter } from "../../../hooks/useCurrencyFormatter";

const PropertyInfo = ({ property }) => {
  const { formatPrice } = useCurrencyFormatter();

  // Calculate price per sq ft
  const getPricePerSqFt = () => {
    if (!property?.price || !property?.area || property.area === 0) return null;
    const pricePerSqFt = Math.round(property.price / property.area);
    return `${formatPrice(pricePerSqFt)} per sq ft`;
  };

  // Format location details
  const formatLocation = () => {
    if (!property?.location) return "Location not specified";

    if (typeof property.location === "string") {
      return property.location;
    }

    const parts = [
      property.location?.address,
      property.location?.landmark,
      property.location?.locality,
      property.location?.city,
      property.location?.state,
      property.location?.pincode,
    ].filter(Boolean);

    return parts.join(", ");
  };

  // Main specifications - compact version
  const mainSpecifications = [
    {
      icon: "Bed",
      label: "Bedrooms",
      value: property?.bedrooms || "-",
      suffix: "",
    },
    {
      icon: "Bath",
      label: "Bathrooms",
      value: property?.bathrooms || "-",
      suffix: "",
    },
    {
      icon: "Square",
      label: "Area",
      value: property?.area
        ? `${property.area.toLocaleString("en-IN")} sq ft`
        : "-",
    },
    {
      icon: "Building2",
      label: "Type",
      value: property?.type || "-",
    },
    {
      icon: "Calendar",
      label: "Year",
      value: property?.builtYear || "-",
    },
    {
      icon: "Car",
      label: "Parking",
      value: property?.parking || "-",
    },
    {
      icon: "Floor",
      label: "Floor",
      value: property?.floor || "-",
    },
    {
      icon: "Layers",
      label: "Total Floors",
      value: property?.totalFloors || "-",
    },
  ];

  // Additional details
  const additionalDetails = [
    { icon: "Compass", label: "Facing", value: property?.facing },
    { icon: "Home", label: "Ownership", value: property?.ownershipType },
    { icon: "Clock", label: "Property Age", value: property?.propertyAge },
    {
      icon: "Ruler",
      label: "Plot Area",
      value: property?.plotArea ? `${property.plotArea} sq ft` : null,
    },
  ].filter((spec) => spec.value);

  // Property status configuration
  const getStatusInfo = () => {
    const status = property?.status || "available";
    const statusConfig = {
      available: {
        label: "Available",
        color: "bg-success/20 text-success border-success/30",
        icon: "CheckCircle",
      },
      sold: {
        label: "Sold",
        color: "bg-error/20 text-error border-error/30",
        icon: "XCircle",
      },
      rented: {
        label: "Rented",
        color: "bg-warning/20 text-warning border-warning/30",
        icon: "Clock",
      },
      "under-construction": {
        label: "Under Construction",
        color: "bg-blue-500/20 text-blue-600 border-blue-500/30",
        icon: "Construction",
      },
      "under-maintenance": {
        label: "Under Maintenance",
        color: "bg-gray-500/20 text-gray-600 border-gray-500/30",
        icon: "Tool",
      },
    };

    return statusConfig[status] || statusConfig.available;
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Super Compact Hero Header */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-md p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 transition-all hover:shadow-md">
        <div className="space-y-4 flex-1">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-2">
              {property?.title || "Property Title Not Available"}
            </h1>
            <div className="flex items-center text-gray-600">
              <Icon name="MapPin" size={16} className="mr-1.5 flex-shrink-0" />
              <span className="text-sm">{formatLocation()}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <div className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-semibold border ${statusInfo.color}`}>
              <Icon name={statusInfo.icon} size={14} />
              <span>{statusInfo.label}</span>
            </div>
            {property?.featured && (
              <div className="flex items-center space-x-1 px-2.5 py-1 bg-gray-50 text-gray-800 rounded text-xs font-semibold border border-gray-200">
                <Icon name="Star" size={14} fill="currentColor" className="text-yellow-500" />
                <span>Featured</span>
              </div>
            )}
            {property?.verified && (
              <div className="flex items-center space-x-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold border border-blue-200">
                <Icon name="Verified" size={14} />
                <span>Verified</span>
              </div>
            )}
            {property?.immediatePossession && (
              <div className="flex items-center space-x-1 px-2.5 py-1 bg-green-50 text-green-700 rounded text-xs font-semibold border border-green-200">
                <Icon name="Zap" size={14} />
                <span>Ready to Move</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:items-end space-y-1 bg-gray-50 p-5 rounded-md md:bg-transparent md:p-0 md:rounded-none border border-gray-200 md:border-transparent">
          <span className="text-3xl lg:text-4xl font-bold text-gray-900">
            {formatPrice(property?.price)}
          </span>
          {property?.originalPrice && property?.originalPrice > property?.price && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(property?.originalPrice)}
              </span>
              <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] uppercase tracking-wider font-semibold rounded">
                {Math.round(((property.originalPrice - property.price) / property.originalPrice) * 100)}% Off
              </span>
            </div>
          )}
          {getPricePerSqFt() && (
            <p className="text-sm text-gray-500 font-medium mt-2">
              {getPricePerSqFt()}
            </p>
          )}
        </div>
      </div>

      {/* 2. Key Specifications Bar */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Key Specifications</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200">
          {mainSpecifications.map((spec, index) => (
            <div key={index} className="p-5 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors group">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name={spec.icon} size={20} className="text-blue-600" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1">{spec.label}</span>
              <span className="font-extrabold text-gray-900 text-sm">
                {spec.value}{spec.suffix}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Description & Features */}
        <div className="lg:col-span-2 space-y-6">
          {property?.description && (
            <div className="bg-white border border-gray-200 shadow-sm rounded-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Property Description</h3>
              <div className="pl-4 border-l-4 border-blue-500">
                <p className="text-gray-600 leading-loose text-sm whitespace-pre-line font-medium">
                  {property.description}
                </p>
              </div>
            </div>
          )}

          {property?.amenities && property.amenities.length > 0 && (
            <div className="bg-white border border-gray-200 shadow-sm rounded-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Amenities & Facilities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 rounded-md bg-gradient-to-r from-gray-50 to-white border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300">
                    <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Icon name="Check" size={14} className="text-blue-600 font-bold" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {property?.features && property.features.length > 0 && (
            <div className="bg-white border border-gray-200 shadow-sm rounded-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3 bg-gray-50 p-3 rounded border border-gray-200">
                    <Icon name="Star" size={16} className="text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" />
                    <span className="text-gray-800 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Additional Details */}
        <div className="space-y-6">
          {additionalDetails.length > 0 && (
            <div className="bg-white border border-gray-200 shadow-sm rounded-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Details</h3>
              <div className="space-y-4">
                {additionalDetails.map((spec, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center text-gray-600">
                      <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center mr-3 border border-gray-200">
                        <Icon name={spec.icon} size={14} className="text-gray-600" />
                      </div>
                      <span className="text-xs uppercase font-semibold tracking-wider">{spec.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-md p-5 border border-gray-200">
             <div className="space-y-3">
               {property?.propertyId && (
                 <div className="flex justify-between items-center">
                   <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Property ID</span>
                   <span className="text-sm font-mono text-gray-900 bg-white px-2 py-1 rounded border border-gray-200">{property.propertyId}</span>
                 </div>
               )}
               {property?.lastUpdated && (
                 <div className="flex justify-between items-center">
                   <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Updated</span>
                   <span className="text-sm text-gray-900">
                     {new Date(property.lastUpdated).toLocaleDateString("en-IN", {
                       day: "numeric", month: "short", year: "numeric"
                     })}
                   </span>
                 </div>
               )}
             </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-md p-5 flex items-start space-x-3 shadow-sm">
             <Icon name="Info" size={20} className="text-gray-500 mt-0.5 flex-shrink-0" />
             <div>
               <p className="text-gray-700 text-xs font-semibold uppercase tracking-wider mb-1.5">Disclaimer</p>
               <p className="text-gray-600 text-xs leading-relaxed">
                 All information is based on data received from the property owner/agent. Please verify details during site visits. Prices are subject to change.
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;