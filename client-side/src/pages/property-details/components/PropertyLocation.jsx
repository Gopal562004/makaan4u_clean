// import React from "react";
// import Icon from "../../../components/AppIcon";

// const PropertyLocation = ({ property }) => {
//   const nearbyPlaces = [
//     { name: "Metro Station", distance: "0.5 km", icon: "Train" },
//     { name: "Shopping Mall", distance: "1.2 km", icon: "ShoppingBag" },
//     { name: "Hospital", distance: "2.1 km", icon: "Heart" },
//     { name: "School", distance: "0.8 km", icon: "GraduationCap" },
//     { name: "Bank", distance: "0.3 km", icon: "Building2" },
//     { name: "Restaurant", distance: "0.2 km", icon: "Utensils" },
//   ];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-xl font-semibold text-foreground mb-4">
//           Location & Neighborhood
//         </h3>

//         {/* Address */}
//         <div className="bg-muted/50 rounded-lg p-4 mb-6">
//           <div className="flex items-start space-x-3">
//             <Icon name="MapPin" size={20} className="text-primary mt-1" />
//             <div>
//               <p className="font-medium text-foreground">{property?.address}</p>
//               <p className="text-muted-foreground">{property?.location}</p>
//               <p className="text-sm text-muted-foreground mt-1">
//                 Pincode: {property?.pincode}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Map */}
//         <div className="w-full h-64 rounded-lg overflow-hidden border border-border mb-6">
//           <iframe
//             width="100%"
//             height="100%"
//             loading="lazy"
//             title={property?.title}
//             referrerPolicy="no-referrer-when-downgrade"
//             src={`https://www.google.com/maps?q=${property?.coordinates?.lat},${property?.coordinates?.lng}&z=14&output=embed`}
//             className="w-full h-full"
//           />
//         </div>

//         {/* Nearby Places */}
//         <div>
//           <h4 className="text-lg font-medium text-foreground mb-4">
//             Nearby Places
//           </h4>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {nearbyPlaces?.map((place, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
//               >
//                 <div className="flex items-center space-x-3">
//                   <Icon name={place?.icon} size={18} className="text-primary" />
//                   <span className="text-foreground">{place?.name}</span>
//                 </div>
//                 <span className="text-sm text-muted-foreground">
//                   {place?.distance}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Transportation */}
//         <div className="mt-6">
//           <h4 className="text-lg font-medium text-foreground mb-4">
//             Transportation
//           </h4>
//           <div className="space-y-3">
//             <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <Icon name="Car" size={18} className="text-primary" />
//                 <span className="text-foreground">City Center</span>
//               </div>
//               <span className="text-sm text-muted-foreground">
//                 15 min drive
//               </span>
//             </div>
//             <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <Icon name="Bus" size={18} className="text-primary" />
//                 <span className="text-foreground">Bus Stop</span>
//               </div>
//               <span className="text-sm text-muted-foreground">2 min walk</span>
//             </div>
//             <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <Icon name="Plane" size={18} className="text-primary" />
//                 <span className="text-foreground">Airport</span>
//               </div>
//               <span className="text-sm text-muted-foreground">
//                 45 min drive
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyLocation;
import React from "react";
import Icon from "../../../components/AppIcon";

const PropertyLocation = ({ property }) => {
  // Enhanced location data with fallbacks
  const locationData = property?.location || {};

  // Nearby places with dynamic data if available
  const nearbyPlaces = property?.nearbyPlaces || [
    {
      name: "Metro Station",
      distance: "0.5 km",
      icon: "Train",
      type: "transport",
    },
    {
      name: "Shopping Mall",
      distance: "1.2 km",
      icon: "ShoppingBag",
      type: "shopping",
    },
    { name: "Hospital", distance: "2.1 km", icon: "Heart", type: "healthcare" },
    {
      name: "School",
      distance: "0.8 km",
      icon: "GraduationCap",
      type: "education",
    },
    {
      name: "Bank/ATM",
      distance: "0.3 km",
      icon: "Building2",
      type: "finance",
    },
    {
      name: "Restaurant",
      distance: "0.2 km",
      icon: "Utensils",
      type: "dining",
    },
    {
      name: "Supermarket",
      distance: "0.4 km",
      icon: "ShoppingCart",
      type: "shopping",
    },
    { name: "Park", distance: "0.6 km", icon: "Tree", type: "recreation" },
  ];

  // Transportation options
  const transportation = property?.transportation || [
    {
      mode: "City Center",
      time: "15 min",
      distance: "8 km",
      icon: "Car",
      type: "drive",
    },
    {
      mode: "Nearest Bus Stop",
      time: "2 min",
      distance: "150 m",
      icon: "Bus",
      type: "walk",
    },
    {
      mode: "Railway Station",
      time: "10 min",
      distance: "3 km",
      icon: "Train",
      type: "drive",
    },
    {
      mode: "Airport",
      time: "45 min",
      distance: "25 km",
      icon: "Plane",
      type: "drive",
    },
    {
      mode: "Metro Station",
      time: "5 min",
      distance: "0.5 km",
      icon: "Train",
      type: "walk",
    },
    {
      mode: "Taxi Stand",
      time: "1 min",
      distance: "50 m",
      icon: "Taxi",
      type: "walk",
    },
  ];

  // Get coordinates for map - with fallbacks
  const getCoordinates = () => {
    if (property?.coordinates) {
      return property.coordinates;
    }
    // Fallback to property location string for geocoding
    return { lat: null, lng: null };
  };

  // Format complete address
  const getCompleteAddress = () => {
    if (typeof locationData === "string") {
      return locationData;
    }

    const addressParts = [
      locationData?.address,
      locationData?.landmark,
      locationData?.locality,
      locationData?.area,
      locationData?.city,
      locationData?.state,
      locationData?.pincode ? `Pincode: ${locationData.pincode}` : null,
    ].filter(Boolean);

    return addressParts.join(", ");
  };

  // Get map URL
  const getMapUrl = () => {
    const coords = getCoordinates();
    if (coords.lat && coords.lng) {
      return `https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`;
    }

    // Fallback to address-based map
    const address = encodeURIComponent(getCompleteAddress());
    return `https://www.google.com/maps?q=${address}&output=embed`;
  };

  // Get travel time color
  const getTimeColor = (time) => {
    if (time.includes("min")) {
      const minutes = parseInt(time);
      if (minutes <= 5) return "text-success";
      if (minutes <= 15) return "text-warning";
      return "text-muted-foreground";
    }
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Location & Neighborhood
        </h3>

        {/* Complete Address */}
        <div className="bg-muted/30 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <Icon
              name="MapPin"
              size={20}
              className="text-primary mt-0.5 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground mb-1">
                Complete Address
              </p>
              <p className="text-foreground leading-relaxed">
                {getCompleteAddress()}
              </p>

              {/* Additional Location Details */}
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-border/50">
                {locationData?.landmark && (
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Navigation"
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-medium">Landmark:</span>{" "}
                      {locationData.landmark}
                    </span>
                  </div>
                )}
                {locationData?.locality && (
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Compass"
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-medium">Locality:</span>{" "}
                      {locationData.locality}
                    </span>
                  </div>
                )}
                {locationData?.area && (
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Map"
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-medium">Area:</span>{" "}
                      {locationData.area}
                    </span>
                  </div>
                )}
                {locationData?.city && (
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Building"
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-medium">City:</span>{" "}
                      {locationData.city}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-medium text-foreground">
              Property Location
            </h4>
            <button className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80">
              <Icon name="Navigation" size={14} />
              <span>Open in Maps</span>
            </button>
          </div>
          <div className="w-full h-64 rounded-lg overflow-hidden border border-border bg-muted/20">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={`Location of ${property?.title}`}
              referrerPolicy="no-referrer-when-downgrade"
              src={getMapUrl()}
              className="w-full h-full"
            />
            <div className="bg-background/80 backdrop-blur-sm p-2 text-center border-t">
              <p className="text-xs text-muted-foreground">
                Interactive map showing property location
              </p>
            </div>
          </div>
        </div>

        {/* Nearby Places Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-foreground">
              Nearby Places
            </h4>
            <span className="text-sm text-muted-foreground">
              {nearbyPlaces.length} places nearby
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nearbyPlaces.map((place, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon
                      name={place.icon}
                      size={16}
                      className="text-primary"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground text-sm truncate">
                      {place.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {place.type}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground bg-background px-2 py-1 rounded-md flex-shrink-0 ml-2">
                  {place.distance}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Transportation Options */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-foreground">
              Transportation Access
            </h4>
            <span className="text-sm text-muted-foreground">
              {transportation.length} options
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {transportation.map((transport, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      transport.type === "walk"
                        ? "bg-green-500/10"
                        : transport.type === "drive"
                        ? "bg-blue-500/10"
                        : "bg-purple-500/10"
                    }`}
                  >
                    <Icon
                      name={transport.icon}
                      size={16}
                      className={
                        transport.type === "walk"
                          ? "text-green-600"
                          : transport.type === "drive"
                          ? "text-blue-600"
                          : "text-purple-600"
                      }
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground text-sm">
                      {transport.mode}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transport.distance}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p
                    className={`text-sm font-semibold ${getTimeColor(
                      transport.time
                    )}`}
                  >
                    {transport.time}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {transport.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Highlights */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <Icon
              name="Info"
              size={18}
              className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100 text-sm">
                Location Highlights
              </p>
              <ul className="text-blue-800 dark:text-blue-200 text-sm mt-1 space-y-1">
                <li>• Prime location with excellent connectivity</li>
                <li>• All essential amenities within 1 km radius</li>
                <li>• Well-connected with public transportation</li>
                <li>• Peaceful neighborhood with good security</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyLocation;