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
        <div className="bg-gradient-to-r from-blue-50/50 to-white border border-gray-200 shadow-sm rounded-md p-6 mb-8 hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-100 shadow-sm">
              <Icon
                name="MapPin"
                size={22}
                className="text-blue-600"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-gray-900 mb-1.5 text-lg">
                Complete Address
              </p>
              <p className="text-gray-700 leading-relaxed text-sm">
                {getCompleteAddress()}
              </p>

              {/* Additional Location Details */}
              <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-gray-100">
                {locationData?.landmark && (
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Navigation"
                      size={14}
                      className="text-blue-500 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 truncate">
                      <span className="font-bold uppercase tracking-wider text-[10px] text-gray-400 mr-1">Landmark:</span>{" "}
                      <span className="font-bold">{locationData.landmark}</span>
                    </span>
                  </div>
                )}
                {locationData?.locality && (
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Compass"
                      size={14}
                      className="text-blue-500 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 truncate">
                      <span className="font-bold uppercase tracking-wider text-[10px] text-gray-400 mr-1">Locality:</span>{" "}
                      <span className="font-bold">{locationData.locality}</span>
                    </span>
                  </div>
                )}
                {locationData?.area && (
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Map"
                      size={14}
                      className="text-blue-500 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 truncate">
                      <span className="font-bold uppercase tracking-wider text-[10px] text-gray-400 mr-1">Area:</span>{" "}
                      <span className="font-bold">{locationData.area}</span>
                    </span>
                  </div>
                )}
                {locationData?.city && (
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Building"
                      size={14}
                      className="text-blue-500 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 truncate">
                      <span className="font-bold uppercase tracking-wider text-[10px] text-gray-400 mr-1">City:</span>{" "}
                      <span className="font-bold">{locationData.city}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-gray-900">
              Property Location
            </h4>
            <button className="flex items-center space-x-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              <Icon name="Navigation" size={14} />
              <span>Open in Maps</span>
            </button>
          </div>
          <div className="w-full h-80 rounded-md overflow-hidden border border-gray-200 shadow-md ring-1 ring-gray-900/5 bg-gray-50 relative group">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={`Location of ${property?.title}`}
              referrerPolicy="no-referrer-when-downgrade"
              src={getMapUrl()}
              className="w-full h-full border-0 grayscale-[20%] contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100"
            />
            <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md p-3 text-center border-t border-gray-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-[10px] font-bold text-gray-600 tracking-wider uppercase">
                Interactive map showing property location
              </p>
            </div>
          </div>
        </div>

        {/* Nearby Places Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Nearby Places
            </h4>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {nearbyPlaces.length} places
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nearbyPlaces.map((place, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-md hover:border-blue-200 hover:shadow-sm shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all duration-300"
              >
                <div className="flex items-center space-x-4 min-w-0 flex-1">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon
                      name={place.icon}
                      size={18}
                      className="text-blue-600"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold text-gray-900 text-sm truncate">
                      {place.name}
                    </p>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                      {place.type}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-700 bg-gray-50 px-2.5 py-1 rounded-md flex-shrink-0 ml-3 border border-gray-200">
                  {place.distance}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Transportation Options */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Transportation Access
            </h4>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {transportation.length} options
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {transportation.map((transport, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-md hover:border-blue-200 hover:shadow-sm shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all duration-300"
              >
                <div className="flex items-center space-x-4 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      transport.type === "walk"
                        ? "bg-green-50"
                        : transport.type === "drive"
                        ? "bg-blue-50"
                        : "bg-purple-50"
                    }`}
                  >
                    <Icon
                      name={transport.icon}
                      size={18}
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
                    <p className="font-extrabold text-gray-900 text-sm">
                      {transport.mode}
                    </p>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mt-0.5">
                      {transport.distance}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p
                    className={`text-sm font-extrabold ${getTimeColor(
                      transport.time
                    )}`}
                  >
                    {transport.time}
                  </p>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mt-0.5">
                    {transport.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Highlights */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
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