import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import { optimizeImageUrl } from "../../../utils/imageOptimizer"; // 🔥 ADD THIS IMPORT

const PropertyCard = ({
  property,
  onWishlistToggle,
  isWishlisted = false,
  viewMode = "grid",
  showFeaturedBadge = true,
  showQuickActions = true,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  // Enhanced price formatting with currency symbols
  const formatPrice = (price) => {
    if (!price || price === 0) return "Price on request";
    if (price >= 10000000) {
      const crorePrice = price / 10000000;
      return `₹${
        crorePrice % 1 === 0 ? crorePrice.toFixed(0) : crorePrice.toFixed(1)
      } Cr`;
    }
    if (price >= 100000) {
      const lakhPrice = price / 100000;
      return `₹${
        lakhPrice % 1 === 0 ? lakhPrice.toFixed(0) : lakhPrice.toFixed(1)
      } L`;
    }
    return `₹${price?.toLocaleString("en-IN")}`;
  };

  // Format location text
  const formatLocation = () => {
    if (!property?.location) return "Location not available";

    if (typeof property.location === "string") {
      return property.location;
    }

    const parts = [
      property.location?.address,
      property.location?.city,
      property.location?.state,
    ].filter(Boolean);

    return parts.join(", ") || "Location not available";
  };

  const handleViewDetails = () => {
    console.log("Navigating to slug:", property);
    navigate(`/property-details/${property?.slug}`);
  };

  const handleWishlistClick = (e) => {
    e?.stopPropagation();
    onWishlistToggle?.(property?._id);
  };

  // Enhanced WhatsApp contact with better message
  const handleWhatsAppContact = useCallback(
    (e) => {
      e?.stopPropagation();

      if (!property?.agentInfo?.phone) {
        console.warn("No agent phone number available");
        return;
      }

      const agentName = property?.agentInfo?.name || "there";
      const propertyTitle = property?.title || "your property";
      const propertyPrice = property?.price ? formatPrice(property.price) : "";
      const location = formatLocation();

      const message = `Hi ${agentName}! 

I'm interested in your property: 
🏠 ${propertyTitle}
💰 ${propertyPrice}
📍 ${location}

Could you please provide more details and available viewing schedules?`;

      const phoneNumber = property.agentInfo.phone.replace(/\D/g, "");

      if (!phoneNumber) {
        console.warn("Invalid phone number format");
        return;
      }

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    },
    [property]
  );

  // Calculate price per unit area
  const getPricePerUnit = () => {
    if (
      !property?.price ||
      !property?.specifications?.area ||
      property.specifications.area === 0
    )
      return null;

    const pricePerUnit = Math.round(
      property.price / property.specifications.area
    );
    return `₹${pricePerUnit?.toLocaleString("en-IN")} per ${
      property.specifications.areaUnit
    }`;
  };

  // Get status color and text
  const getStatusInfo = () => {
    const status = property?.status || "available";
    const statusConfig = {
      available: { color: "success", text: "Available" },
      sold: { color: "error", text: "Sold" },
      rented: { color: "warning", text: "Rented" },
      "under-maintenance": { color: "muted", text: "Maintenance" },
    };

    return statusConfig[status] || statusConfig.available;
  };

  // Handle image load and error
  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // 🔥 ENHANCED: Optimized image source with WebP support
  const getImageSrc = () => {
    if (imageError || !property?.images?.[0]?.url) {
      return "/images/property-placeholder.jpg";
    }

    // Use optimized image URL with WebP format
    return optimizeImageUrl(property.images[0].url, {
      width: viewMode === "list" ? 400 : 600,
      quality: 80,
    });
  };

  // 🔥 ADD: Generate SEO-friendly alt text
  const generateImageAltText = () => {
    return (
      property?.images?.[0]?.altText ||
      `${property?.title} - ${
        property?.specifications?.type
      } in ${formatLocation()}` ||
      "Property image"
    );
  };

  // 🔥 ADD: Generate property schema for structured data
  const generatePropertySchema = () => {
    if (!property) return null;

    return {
      "@type": "RealEstateListing",
      name: property.title,
      description:
        property.description ||
        `${property.specifications?.bedrooms} BHK ${
          property.specifications?.type
        } in ${formatLocation()}`,
      url: `${window.location.origin}/property-details/${property.slug}`,
      image: getImageSrc(),
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "INR",
        availability:
          property.status === "available"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
      },
      numberOfRooms: property.specifications?.bedrooms,
      numberOfBathroomsTotal: property.specifications?.bathrooms,
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.specifications?.area,
        unitCode: property.specifications?.areaUnit === "sqft" ? "FTK" : "MTK",
      },
    };
  };

  // ====== LIST VIEW ======
  if (viewMode === "list") {
    const statusInfo = getStatusInfo();

    return (
      <article
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 md:p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-primary/20"
        onClick={handleViewDetails}
        itemScope
        itemType="https://schema.org/RealEstateListing"
        // 🔥 ADD: Hidden structured data
        data-schema={JSON.stringify(generatePropertySchema())}
      >
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
          {/* Image - Reduced height */}
          <div className="w-full md:w-48 lg:w-56 xl:w-64 h-40 md:h-32 lg:h-36 flex-shrink-0 overflow-hidden rounded-lg relative">
            {/* Loading skeleton */}
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
            )}

            <Image
              src={getImageSrc()}
              alt={generateImageAltText()}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              itemProp="image"
            />

            {/* Badges overlay */}
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              {/* Status Badge */}
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
                  statusInfo.color === "success"
                    ? "bg-green-500/90 text-white"
                    : statusInfo.color === "error"
                    ? "bg-red-500/90 text-white"
                    : statusInfo.color === "warning"
                    ? "bg-orange-500/90 text-white"
                    : "bg-gray-500/90 text-white"
                }`}
                itemProp="availability"
              >
                {statusInfo.text}
              </span>

              {/* Featured Badge */}
              {showFeaturedBadge && property?.featured && (
                <span className="px-2 py-1 bg-blue-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                  Featured
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistClick}
              className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                isWishlisted
                  ? "bg-red-500/90 text-white shadow-lg"
                  : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-500/90 hover:text-white"
              }`}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Icon
                name="Heart"
                size={16}
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-1 sm:space-y-0">
              <div className="min-w-0 flex-1 space-y-1">
                {/* Title */}
                <h3
                  className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight"
                  itemProp="name"
                >
                  {property?.title || "Untitled Property"}
                </h3>

                {/* Location */}
                <p
                  className="text-xs md:text-sm text-gray-600 dark:text-gray-300 flex items-start"
                  itemProp="address"
                >
                  <Icon
                    name="MapPin"
                    size={14}
                    className="mr-1.5 mt-0.5 flex-shrink-0"
                  />
                  <span className="line-clamp-2">{formatLocation()}</span>
                </p>
              </div>

              {/* Price - Desktop */}
              <div className="hidden sm:block text-right min-w-0">
                <p
                  className="text-xl lg:text-2xl font-bold text-primary"
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <span itemProp="price" content={property?.price}>
                    {formatPrice(property?.price)}
                  </span>
                  <meta itemProp="priceCurrency" content="INR" />
                </p>
                {getPricePerUnit() && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {getPricePerUnit()}
                  </p>
                )}
              </div>
            </div>

            {/* Property Details */}
            <div className="flex items-center space-x-3 md:space-x-4 text-xs text-gray-600 dark:text-gray-400">
              {property?.specifications?.bedrooms && (
                <span className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-800 px-2 py-1.5 rounded-md">
                  <Icon name="Bed" size={14} />
                  <span className="font-medium" itemProp="numberOfRooms">
                    {property.specifications.bedrooms} Beds
                  </span>
                </span>
              )}
              {property?.specifications?.bathrooms && (
                <span className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-800 px-2 py-1.5 rounded-md">
                  <Icon name="Bath" size={14} />
                  <span
                    className="font-medium"
                    itemProp="numberOfBathroomsTotal"
                  >
                    {property.specifications.bathrooms} Baths
                  </span>
                </span>
              )}
              {property?.specifications?.area && (
                <span className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-800 px-2 py-1.5 rounded-md">
                  <Icon name="Square" size={14} />
                  <span className="font-medium">
                    <span
                      itemProp="floorSize"
                      itemScope
                      itemType="https://schema.org/QuantitativeValue"
                    >
                      <span itemProp="value">
                        {property.specifications.area.toLocaleString("en-IN")}
                      </span>
                      <span itemProp="unitCode">
                        {property.specifications.areaUnit === "sqft"
                          ? "FTK"
                          : "MTK"}
                      </span>
                    </span>{" "}
                    {property.specifications.areaUnit}
                  </span>
                </span>
              )}
            </div>

            {/* Price - Mobile */}
            <div className="sm:hidden">
              <p
                className="text-xl font-bold text-primary"
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <span itemProp="price" content={property?.price}>
                  {formatPrice(property?.price)}
                </span>
                <meta itemProp="priceCurrency" content="INR" />
              </p>
              {getPricePerUnit() && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {getPricePerUnit()}
                </p>
              )}
            </div>

            {/* Agent Info & Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
              {/* Agent Info */}
              {property?.agentInfo?.name && (
                <div className="flex items-center space-x-2 min-w-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-xs font-bold text-white">
                      {property.agentInfo.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {property.agentInfo.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {property.agentInfo.designation}
                      {property.agentInfo.experience &&
                        ` • ${property.agentInfo.experience} experience`}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWhatsAppContact}
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="flex-1 sm:flex-none text-xs"
                >
                  <span className="hidden sm:inline">WhatsApp</span>
                  <span className="sm:hidden">Chat</span>
                </Button>
                <Button
                  size="sm"
                  onClick={handleViewDetails}
                  className="flex-1 sm:flex-none text-xs"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // ====== GRID VIEW ======
  const statusInfo = getStatusInfo();

  return (
    <article
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col hover:border-primary/20"
      onClick={handleViewDetails}
      itemScope
      itemType="https://schema.org/RealEstateListing"
      // 🔥 ADD: Hidden structured data
      data-schema={JSON.stringify(generatePropertySchema())}
    >
      {/* Image Container - Reduced height */}
      <div className="relative overflow-hidden h-40 sm:h-44 md:h-40 lg:h-44 flex-shrink-0">
        {/* Loading skeleton */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}

        <Image
          src={getImageSrc()}
          alt={generateImageAltText()}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          itemProp="image"
        />

        {/* Badges overlay */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {/* Status Badge */}
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
              statusInfo.color === "success"
                ? "bg-green-500/90 text-white"
                : statusInfo.color === "error"
                ? "bg-red-500/90 text-white"
                : statusInfo.color === "warning"
                ? "bg-orange-500/90 text-white"
                : "bg-gray-500/90 text-white"
            }`}
            itemProp="availability"
          >
            {statusInfo.text}
          </span>

          {/* Featured Badge */}
          {showFeaturedBadge && property?.featured && (
            <span className="px-2 py-1 bg-blue-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {/* <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isWishlisted
              ? "bg-red-500/90 text-white shadow-lg"
              : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-500/90 hover:text-white"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Icon
            name="Heart"
            size={16}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button> */}

        {/* Property Type Badge */}
        {property?.specifications?.type && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 text-xs font-semibold rounded-full capitalize">
              {property.specifications.type}
            </span>
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white font-semibold text-xs bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
            Click to View Details
          </span>
        </div>
      </div>

      {/* Content - Reduced padding and spacing */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col space-y-3">
        {/* Header */}
        <div className="space-y-1.5 flex-1">
          <h3
            className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors"
            itemProp="name"
          >
            {property?.title || "Untitled Property"}
          </h3>

          <p
            className="text-xs text-gray-600 dark:text-gray-300 flex items-start"
            itemProp="address"
          >
            <Icon
              name="MapPin"
              size={12}
              className="mr-1 mt-0.5 flex-shrink-0"
            />
            <span className="line-clamp-2">{formatLocation()}</span>
          </p>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2 sm:space-x-3">
            {property?.specifications?.bedrooms && (
              <span className="flex items-center space-x-1">
                <Icon name="Bed" size={12} className="sm:w-3 sm:h-3" />
                <span className="font-medium" itemProp="numberOfRooms">
                  {property.specifications.bedrooms}
                </span>
              </span>
            )}
            {property?.specifications?.bathrooms && (
              <span className="flex items-center space-x-1">
                <Icon name="Bath" size={12} className="sm:w-3 sm:h-3" />
                <span className="font-medium" itemProp="numberOfBathroomsTotal">
                  {property.specifications.bathrooms}
                </span>
              </span>
            )}
            {property?.specifications?.area && (
              <span className="flex items-center space-x-1">
                <Icon name="Square" size={12} className="sm:w-3 sm:h-3" />
                <span className="font-medium">
                  <span
                    itemProp="floorSize"
                    itemScope
                    itemType="https://schema.org/QuantitativeValue"
                  >
                    <span itemProp="value">
                      {property.specifications.area.toLocaleString("en-IN")}
                    </span>
                    <span itemProp="unitCode">
                      {property.specifications.areaUnit === "sqft"
                        ? "FTK"
                        : "MTK"}
                    </span>
                  </span>{" "}
                  {property.specifications.areaUnit}
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="space-y-0.5">
          <p
            className="text-lg sm:text-xl font-bold text-primary"
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <span itemProp="price" content={property?.price}>
              {formatPrice(property?.price)}
            </span>
            <meta itemProp="priceCurrency" content="INR" />
          </p>
          {getPricePerUnit() && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {getPricePerUnit()}
            </p>
          )}
        </div>

        {/* Agent Info */}
        {property?.agentInfo?.name && (
          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-xs font-bold text-white">
                  {property.agentInfo.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                  {property.agentInfo.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {property.agentInfo.designation}
                </p>
              </div>
            </div>
            {showQuickActions && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWhatsAppContact}
                iconName="MessageCircle"
                className="flex-shrink-0 text-xs p-1.5"
              >
                <span className="hidden xs:inline">Chat</span>
              </Button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-auto">
          <Button
            variant="outline"
            fullWidth
            onClick={handleWhatsAppContact}
            iconName="MessageCircle"
            iconPosition="left"
            size="sm"
            className="text-xs"
          >
            WhatsApp
          </Button>
          <Button
            fullWidth
            onClick={handleViewDetails}
            size="sm"
            className="text-xs"
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
};

export default React.memo(PropertyCard);