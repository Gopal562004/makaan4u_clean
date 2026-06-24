import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import { optimizeImageUrl } from "../../../utils/imageOptimizer";

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

  const formatPrice = (price) => {
    if (!price || price === 0) return "Price on request";
    if (price >= 10000000) {
      const crorePrice = price / 10000000;
      return `₹${crorePrice % 1 === 0 ? crorePrice.toFixed(0) : crorePrice.toFixed(1)} Cr`;
    }
    if (price >= 100000) {
      const lakhPrice = price / 100000;
      return `₹${lakhPrice % 1 === 0 ? lakhPrice.toFixed(0) : lakhPrice.toFixed(1)} L`;
    }
    return `₹${price?.toLocaleString("en-IN")}`;
  };

  const formatLocation = () => {
    if (!property?.location) return "Location not available";
    if (typeof property.location === "string") return property.location;
    const parts = [property.location?.address, property.location?.city, property.location?.state].filter(Boolean);
    return parts.join(", ") || "Location not available";
  };

  const handleViewDetails = () => {
    navigate(`/property-details/${property?.slug}`);
  };

  const handleWishlistClick = (e) => {
    e?.stopPropagation();
    onWishlistToggle?.(property?._id);
  };

  const handleWhatsAppContact = useCallback(
    (e) => {
      e?.stopPropagation();
      if (!property?.agentInfo?.phone) return;

      const agentName = property?.agentInfo?.name || "there";
      const propertyTitle = property?.title || "your property";
      const propertyPrice = property?.price ? formatPrice(property.price) : "";
      const location = formatLocation();

      const message = `Hi ${agentName}! \n\nI'm interested in your property: \n🏠 ${propertyTitle}\n💰 ${propertyPrice}\n📍 ${location}\n\nCould you please provide more details and available viewing schedules?`;

      const phoneNumber = property.agentInfo.phone.replace(/\D/g, "");
      if (!phoneNumber) return;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    },
    [property]
  );

  const getPricePerUnit = () => {
    if (!property?.price || !property?.specifications?.area || property.specifications.area === 0) return null;
    const pricePerUnit = Math.round(property.price / property.specifications.area);
    return `₹${pricePerUnit?.toLocaleString("en-IN")}/${property.specifications.areaUnit}`;
  };

  const getStatusInfo = () => {
    const status = property?.status || "available";
    const statusConfig = {
      available: { bg: "bg-emerald-50 text-emerald-600 border border-emerald-200/60", text: "Available" },
      sold: { bg: "bg-red-50 text-red-600 border border-red-200/60", text: "Sold" },
      rented: { bg: "bg-amber-50 text-amber-600 border border-amber-200/60", text: "Rented" },
      "under-maintenance": { bg: "bg-slate-50 text-slate-600 border border-slate-200/60", text: "Maintenance" },
    };
    return statusConfig[status] || statusConfig.available;
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError || !property?.images?.[0]?.url) return "/images/property-placeholder.jpg";
    return optimizeImageUrl(property.images[0].url, { width: viewMode === "list" ? 400 : 600, quality: 80 });
  };

  const generateImageAltText = () => {
    return property?.images?.[0]?.altText || `${property?.title} - ${property?.specifications?.type} in ${formatLocation()}` || "Property image";
  };

  const generatePropertySchema = () => {
    if (!property) return null;
    return {
      "@type": "RealEstateListing",
      name: property.title,
      description: property.description || `${property.specifications?.bedrooms} BHK ${property.specifications?.type} in ${formatLocation()}`,
      url: `${window.location.origin}/property-details/${property.slug}`,
      image: getImageSrc(),
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "INR",
        availability: property.status === "available" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
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

  const statusInfo = getStatusInfo();

  if (viewMode === "list") {
    return (
      <article
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row overflow-hidden"
        onClick={handleViewDetails}
        itemScope
        itemType="https://schema.org/RealEstateListing"
        data-schema={JSON.stringify(generatePropertySchema())}
      >
        <div className="relative w-full sm:w-64 md:w-72 h-48 sm:h-auto flex-shrink-0">
          {imageLoading && <div className="absolute inset-0 bg-slate-100 dark:bg-gray-800 animate-pulse" />}
          <Image
            src={getImageSrc()}
            alt={generateImageAltText()}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            itemProp="image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
            <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded bg-white/90 shadow-sm ${statusInfo.bg}`}>
              {statusInfo.text}
            </span>
            {showFeaturedBadge && property?.featured && (
              <span className="px-2.5 py-1 bg-gray-900 text-white text-[10px] uppercase tracking-wider font-semibold rounded shadow-sm">
                Featured
              </span>
            )}
          </div>


        </div>

        <div className="flex-1 p-4 sm:p-5 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-2 gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-700 transition-colors truncate" itemProp="name">
                {property?.title || "Untitled Property"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center" itemProp="address">
                <Icon name="MapPin" size={14} className="mr-1.5 text-gray-400 flex-shrink-0" />
                <span className="truncate">{formatLocation()}</span>
              </p>
            </div>
            <div className="mt-3 sm:mt-0 text-left sm:text-right flex-shrink-0">
              <p className="text-xl md:text-2xl font-bold text-gray-900" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <span itemProp="price" content={property?.price}>{formatPrice(property?.price)}</span>
                <meta itemProp="priceCurrency" content="INR" />
              </p>
              {getPricePerUnit() && <p className="text-xs font-medium text-gray-400 mt-0.5">{getPricePerUnit()}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-4 my-4">
            {property?.specifications?.bedrooms && (
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Icon name="BedDouble" size={16} className="mr-1.5 text-gray-400" />
                <span className="text-sm font-semibold">{property.specifications.bedrooms} <span className="font-normal text-xs text-gray-500">Beds</span></span>
              </div>
            )}
            {property?.specifications?.bathrooms && (
              <>
                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Icon name="Bath" size={16} className="mr-1.5 text-gray-400" />
                  <span className="text-sm font-semibold">{property.specifications.bathrooms} <span className="font-normal text-xs text-gray-500">Baths</span></span>
                </div>
              </>
            )}
            {property?.specifications?.area && (
              <>
                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Icon name="Maximize" size={16} className="mr-1.5 text-gray-400" />
                  <span className="text-sm font-semibold">{property.specifications.area.toLocaleString("en-IN")} <span className="font-normal text-xs text-gray-500">{property.specifications.areaUnit}</span></span>
                </div>
              </>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
            {property?.agentInfo?.name ? (
              <div className="flex items-center space-x-2 min-w-0">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-gray-600 font-semibold text-xs border border-gray-200 dark:border-gray-700 flex-shrink-0">
                  {property.agentInfo.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white leading-none truncate">{property.agentInfo.name}</p>
                  <p className="text-[10px] text-gray-500 mt-1 truncate">{property.agentInfo.designation}</p>
                </div>
              </div>
            ) : <div />}

            <div className="flex space-x-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleWhatsAppContact}
                iconName="MessageCircle"
                className="text-xs px-3 rounded border-gray-200 hover:bg-gray-50 font-semibold text-gray-700"
              >
                Chat
              </Button>
              <Button size="sm" onClick={handleViewDetails} className="text-xs px-4 rounded bg-gray-900 hover:bg-gray-800 text-white border-none font-semibold">
                Details
              </Button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded hover:shadow-md transition-all duration-300 group cursor-pointer h-full flex flex-col overflow-hidden"
      onClick={handleViewDetails}
      itemScope
      itemType="https://schema.org/RealEstateListing"
      data-schema={JSON.stringify(generatePropertySchema())}
    >
      <div className="relative overflow-hidden h-52 sm:h-48 md:h-52 lg:h-56 flex-shrink-0">
        {imageLoading && <div className="absolute inset-0 bg-slate-100 dark:bg-gray-800 animate-pulse" />}
        <Image
          src={getImageSrc()}
          alt={generateImageAltText()}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          itemProp="image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
          <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded bg-white/90 shadow-sm ${statusInfo.bg}`}>
            {statusInfo.text}
          </span>
          {showFeaturedBadge && property?.featured && (
            <span className="px-2.5 py-1 bg-gray-900 text-white text-[10px] uppercase tracking-wider font-semibold rounded shadow-sm">
              Featured
            </span>
          )}
        </div>



        {property?.specifications?.type && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="bg-white/20 border border-white/30 backdrop-blur-md text-white px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md shadow-sm">
              {property.specifications.type}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="mb-3 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <p className="text-xl font-bold text-gray-900" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <span itemProp="price" content={property?.price}>{formatPrice(property?.price)}</span>
              <meta itemProp="priceCurrency" content="INR" />
            </p>
          </div>
          {getPricePerUnit() && <p className="text-[11px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">{getPricePerUnit()}</p>}
          <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-700 transition-colors truncate" itemProp="name">
            {property?.title || "Untitled Property"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center" itemProp="address">
            <Icon name="MapPin" size={12} className="mr-1.5 text-gray-400" />
            <span className="truncate">{formatLocation()}</span>
          </p>
        </div>

        <div className="flex items-center justify-between py-3 border-y border-gray-100 dark:border-gray-800 mb-4">
          {property?.specifications?.bedrooms && (
            <div className="flex flex-col items-center">
              <Icon name="BedDouble" size={16} className="text-gray-400 mb-1" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{property.specifications.bedrooms} <span className="font-normal text-gray-400">Beds</span></span>
            </div>
          )}
          {property?.specifications?.bathrooms && (
            <>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
              <div className="flex flex-col items-center">
                <Icon name="Bath" size={16} className="text-gray-400 mb-1" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{property.specifications.bathrooms} <span className="font-normal text-gray-400">Baths</span></span>
              </div>
            </>
          )}
          {property?.specifications?.area && (
            <>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
              <div className="flex flex-col items-center">
                <Icon name="Maximize" size={16} className="text-gray-400 mb-1" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{property.specifications.area.toLocaleString("en-IN")} <span className="font-normal text-gray-400">{property.specifications.areaUnit}</span></span>
              </div>
            </>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 min-w-0">
          {property?.agentInfo?.name ? (
            <div className="flex items-center space-x-2 min-w-0">
               <div className="w-7 h-7 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-gray-600 font-semibold text-xs border border-gray-200 dark:border-gray-700 flex-shrink-0">
                {property.agentInfo.name.charAt(0).toUpperCase()}
              </div>
              <div className="truncate min-w-0">
                <p className="text-[11px] font-semibold text-gray-900 dark:text-white uppercase tracking-wide leading-none truncate">{property.agentInfo.name}</p>
                <p className="text-[10px] text-gray-500 mt-0.5 truncate">{property.agentInfo.designation}</p>
              </div>
            </div>
          ) : <div />}

          {showQuickActions && (
            <div className="flex space-x-2 flex-shrink-0">
               <Button
                variant="outline"
                size="sm"
                onClick={handleWhatsAppContact}
                className="w-8 h-8 p-0 rounded border-gray-200 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                title="WhatsApp"
              >
                <Icon name="MessageCircle" size={14} />
              </Button>
              <Button size="sm" onClick={handleViewDetails} className="h-8 px-3 rounded bg-gray-900 hover:bg-gray-800 text-white text-xs border-transparent shadow-sm">
                Details
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default React.memo(PropertyCard);