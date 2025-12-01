// // import React, { useState } from "react";
// // import Icon from "../../../components/AppIcon";
// // import Button from "../../../components/ui/Button";

// // const PropertyMap = ({ properties, onPropertySelect, selectedProperty }) => {
// //   const [mapCenter] = useState({ lat: 19.076, lng: 72.8777 }); // Mumbai coordinates

// //   const formatPrice = (price) => {
// //     if (price >= 10000000) return `₹${(price / 10000000)?.toFixed(1)}Cr`;
// //     if (price >= 100000) return `₹${(price / 100000)?.toFixed(1)}L`;
// //     return `₹${price?.toLocaleString()}`;
// //   };

// //   const handlePropertyClick = (property) => {
// //     onPropertySelect?.(property);
// //   };

// //   return (
// //     <div className="relative h-full bg-muted rounded-lg overflow-hidden">
// //       {/* Map Container */}
// //       <div className="w-full h-full">
// //         <iframe
// //           width="100%"
// //           height="100%"
// //           loading="lazy"
// //           title="Properties Map"
// //           referrerPolicy="no-referrer-when-downgrade"
// //           src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12&output=embed`}
// //           className="border-0"
// //         />
// //       </div>
// //       {/* Property Markers Overlay */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         {properties?.map((property, index) => {
// //           // Simulate marker positions based on property index
// //           const markerStyle = {
// //             position: "absolute",
// //             left: `${20 + (index % 5) * 15}%`,
// //             top: `${20 + Math.floor(index / 5) * 20}%`,
// //             pointerEvents: "auto",
// //           };

// //           return (
// //             <div key={property?.id} style={markerStyle}>
// //               <button
// //                 onClick={() => handlePropertyClick(property)}
// //                 className={`relative bg-primary text-primary-foreground px-3 py-2 rounded-lg shadow-moderate hover:shadow-prominent transition-all duration-200 transform hover:scale-105 ${
// //                   selectedProperty?.id === property?.id
// //                     ? "ring-2 ring-primary ring-offset-2"
// //                     : ""
// //                 }`}
// //               >
// //                 <div className="text-xs font-semibold whitespace-nowrap">
// //                   {formatPrice(property?.price)}
// //                 </div>
// //                 <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
// //               </button>
// //             </div>
// //           );
// //         })}
// //       </div>
// //       {/* Map Controls */}
// //       <div className="absolute top-4 right-4 flex flex-col space-y-2">
// //         <Button
// //           variant="outline"
// //           size="icon"
// //           className="bg-card/90 backdrop-blur-sm"
// //           title="Zoom In"
// //         >
// //           <Icon name="Plus" size={16} />
// //         </Button>
// //         <Button
// //           variant="outline"
// //           size="icon"
// //           className="bg-card/90 backdrop-blur-sm"
// //           title="Zoom Out"
// //         >
// //           <Icon name="Minus" size={16} />
// //         </Button>
// //         <Button
// //           variant="outline"
// //           size="icon"
// //           className="bg-card/90 backdrop-blur-sm"
// //           title="My Location"
// //         >
// //           <Icon name="MapPin" size={16} />
// //         </Button>
// //       </div>
// //       {/* Selected Property Card */}
// //       {selectedProperty && (
// //         <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg shadow-prominent p-4">
// //           <div className="flex items-start space-x-4">
// //             <div className="w-20 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
// //               <img
// //                 src={selectedProperty?.images?.[0]}
// //                 alt={selectedProperty?.imageAlt}
// //                 className="w-full h-full object-cover"
// //                 onError={(e) => {
// //                   e.target.src = "/assets/images/no_image.png";
// //                 }}
// //               />
// //             </div>
// //             <div className="flex-1 min-w-0">
// //               <h4 className="font-semibold text-foreground truncate">
// //                 {selectedProperty?.title}
// //               </h4>
// //               <p className="text-sm text-muted-foreground flex items-center">
// //                 <Icon name="MapPin" size={12} className="mr-1" />
// //                 {selectedProperty?.location}
// //               </p>
// //               <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
// //                 <span>{selectedProperty?.bedrooms} beds</span>
// //                 <span>{selectedProperty?.bathrooms} baths</span>
// //                 <span>{selectedProperty?.area} sq ft</span>
// //               </div>
// //               <p className="text-lg font-bold text-primary mt-1">
// //                 {formatPrice(selectedProperty?.price)}
// //               </p>
// //             </div>
// //             <div className="flex flex-col space-y-2">
// //               <Button
// //                 size="sm"
// //                 onClick={() =>
// //                   window.open(
// //                     `/property-details/${selectedProperty?.id}`,
// //                     "_blank"
// //                   )
// //                 }
// //               >
// //                 View
// //               </Button>
// //               <button
// //                 onClick={() => onPropertySelect(null)}
// //                 className="p-1 text-muted-foreground hover:text-foreground transition-smooth"
// //               >
// //                 <Icon name="X" size={14} />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //       {/* Map Legend */}
// //       <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
// //         <h4 className="text-sm font-semibold text-foreground mb-2">
// //           Map Legend
// //         </h4>
// //         <div className="space-y-1 text-xs">
// //           <div className="flex items-center space-x-2">
// //             <div className="w-3 h-3 bg-primary rounded"></div>
// //             <span className="text-muted-foreground">Available Properties</span>
// //           </div>
// //           <div className="flex items-center space-x-2">
// //             <div className="w-3 h-3 bg-success rounded"></div>
// //             <span className="text-muted-foreground">Recently Sold</span>
// //           </div>
// //           <div className="flex items-center space-x-2">
// //             <div className="w-3 h-3 bg-warning rounded"></div>
// //             <span className="text-muted-foreground">Under Offer</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PropertyMap;
// import React from "react";
// import Icon from "../../../components/AppIcon"; // adjust path

// const PropertyMap = ({ selectedProperty }) => {
//   if (!selectedProperty) return null;

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4">
//       <h2 className="text-lg font-semibold mb-2">{selectedProperty.title}</h2>

//       <p className="text-sm text-muted-foreground flex items-center">
//         <Icon name="MapPin" size={12} className="mr-1" />
//         {selectedProperty?.location?.address},{" "}
//         {selectedProperty?.location?.city}, {selectedProperty?.location?.state}{" "}
//         - {selectedProperty?.location?.pincode}
//       </p>

//       <p className="text-sm mt-2">{selectedProperty?.description}</p>
//       <p className="text-sm font-medium mt-2">
//         ₹{selectedProperty?.price?.toLocaleString()}
//       </p>
//     </div>
//   );
// };

// export default PropertyMap;
import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PropertyMap = ({
  properties = [],
  onPropertySelect,
  selectedProperty,
  height = "100%",
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const defaultCenter = { lat: 19.076, lng: 72.8777 }; // Mumbai coordinates

  // Format price for display
  const formatPrice = (price) => {
    if (!price) return "Price on request";
    if (price >= 10000000) return `₹${(price / 10000000)?.toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000)?.toFixed(1)}L`;
    return `₹${price?.toLocaleString()}`;
  };

  // Get property coordinates (fallback to calculated positions if not available)
  const getPropertyCoordinates = (property, index) => {
    if (
      property?.location?.coordinates?.lat &&
      property?.location?.coordinates?.lng
    ) {
      return {
        lat: property.location.coordinates.lat,
        lng: property.location.coordinates.lng,
      };
    }

    // Fallback: Calculate positions based on index for demo
    const lat = defaultCenter.lat + (Math.random() - 0.5) * 0.1;
    const lng = defaultCenter.lng + (Math.random() - 0.5) * 0.1;
    return { lat, lng };
  };

  // Generate Google Maps URL with markers for all properties
  const generateMapsUrl = () => {
    if (!properties.length) {
      return `https://www.google.com/maps?q=${defaultCenter.lat},${defaultCenter.lng}&z=12&output=embed`;
    }

    const markers = properties
      .map((property, index) => {
        const coords = getPropertyCoordinates(property, index);
        return `&markers=color:blue%7Clabel:${index + 1}%7C${coords.lat},${
          coords.lng
        }`;
      })
      .join("");

    const center = selectedProperty
      ? getPropertyCoordinates(selectedProperty, 0)
      : defaultCenter;

    return `https://www.google.com/maps?q=${center.lat},${center.lng}&z=13${markers}&output=embed`;
  };

  const handlePropertyClick = (property) => {
    onPropertySelect?.(property);
  };

  const handleCloseDetails = () => {
    onPropertySelect?.(null);
  };

  // Get primary image or fallback
  const getPropertyImage = (property) => {
    if (property?.images?.length > 0) {
      const primaryImage =
        property.images.find((img) => img.isPrimary) || property.images[0];
      return typeof primaryImage === "string" ? primaryImage : primaryImage.url;
    }
    return "/assets/images/no_image.png";
  };

  if (properties.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-100 rounded-lg">
        <div className="text-center">
          <Icon name="Map" size={48} className="text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">
            No Properties to Display
          </h3>
          <p className="text-slate-500">
            No properties available to show on the map
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-white rounded-lg overflow-hidden border border-slate-200">
      {/* Map Container */}
      <div className="w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Properties Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={generateMapsUrl()}
          className="border-0"
          onLoad={() => setMapLoaded(true)}
        />

        {/* Loading overlay */}
        {!mapLoaded && (
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-slate-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Property List Sidebar */}
      <div className="absolute top-4 left-4 bottom-4 w-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">
            Properties on Map ({properties.length})
          </h3>
        </div>

        <div className="overflow-y-auto h-[calc(100%-80px)]">
          {properties.map((property, index) => (
            <div
              key={property._id || property.id || index}
              className={`border-b border-slate-100 last:border-b-0 ${
                selectedProperty?._id === property._id
                  ? "bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <button
                onClick={() => handlePropertyClick(property)}
                className="w-full text-left p-4 transition-colors duration-200"
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 w-16 h-12 bg-slate-200 rounded-md overflow-hidden">
                    <img
                      src={getPropertyImage(property)}
                      alt={property.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/assets/images/no_image.png";
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 text-sm truncate">
                      {property.title}
                    </h4>
                    <p className="text-xs text-slate-600 truncate">
                      {property.location?.city || property.location?.address}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-semibold text-blue-600">
                        {formatPrice(property.price)}
                      </span>
                      <div className="flex items-center space-x-2 text-xs text-slate-500">
                        {property.specifications?.bedrooms && (
                          <span>{property.specifications.bedrooms} bed</span>
                        )}
                        {property.specifications?.bathrooms && (
                          <span>{property.specifications.bathrooms} bath</span>
                        )}
                        {property.specifications?.area && (
                          <span>
                            {property.specifications.area}{" "}
                            {property.specifications.areaUnit}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/90 backdrop-blur-sm border-slate-300 hover:bg-white"
          title="Refresh Map"
          onClick={() => setMapLoaded(false)}
        >
          <Icon name="RefreshCw" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/90 backdrop-blur-sm border-slate-300 hover:bg-white"
          title="My Location"
        >
          <Icon name="MapPin" size={16} />
        </Button>
      </div>

      {/* Selected Property Details Card */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg border border-slate-200 p-4 max-w-md">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-slate-900 text-lg">
              {selectedProperty.title}
            </h3>
            <button
              onClick={handleCloseDetails}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          <div className="flex space-x-4">
            <div className="flex-shrink-0 w-24 h-20 bg-slate-200 rounded-md overflow-hidden">
              <img
                src={getPropertyImage(selectedProperty)}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/images/no_image.png";
                }}
              />
            </div>

            <div className="flex-1">
              <p className="text-sm text-slate-600 flex items-center mb-2">
                <Icon name="MapPin" size={12} className="mr-1 flex-shrink-0" />
                <span className="truncate">
                  {selectedProperty.location?.address &&
                    `${selectedProperty.location.address}, `}
                  {selectedProperty.location?.city &&
                    `${selectedProperty.location.city}, `}
                  {selectedProperty.location?.state &&
                    `${selectedProperty.location.state} `}
                  {selectedProperty.location?.pincode &&
                    `- ${selectedProperty.location.pincode}`}
                </span>
              </p>

              <div className="flex items-center space-x-3 text-xs text-slate-500 mb-2">
                {selectedProperty.specifications?.bedrooms && (
                  <span>{selectedProperty.specifications.bedrooms} beds</span>
                )}
                {selectedProperty.specifications?.bathrooms && (
                  <span>{selectedProperty.specifications.bathrooms} baths</span>
                )}
                {selectedProperty.specifications?.area && (
                  <span>
                    {selectedProperty.specifications.area}{" "}
                    {selectedProperty.specifications.areaUnit}
                  </span>
                )}
              </div>

              <p className="text-lg font-bold text-blue-600 mb-3">
                {formatPrice(selectedProperty.price)}
              </p>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() =>
                    window.open(
                      `/property-details/${
                        selectedProperty.slug || selectedProperty.id
                      }`,
                      "_blank"
                    )
                  }
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Add to wishlist or contact functionality
                    console.log(
                      "Contact about property:",
                      selectedProperty._id
                    );
                  }}
                >
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-3 max-w-xs">
        <h4 className="text-sm font-semibold text-slate-900 mb-2">
          Map Legend
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-slate-600">Available Properties</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-slate-600">Recently Sold</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-slate-600">Under Offer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;