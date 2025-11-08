import React, { useState, memo } from "react";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  MessageCircle,
  Star,
} from "lucide-react";
import Button from "../../../components/ui/Button";

const PropertyCard = memo(
  ({
    property,
    t,
    wishlist,
    toggleWishlist,
    handleViewDetails,
    handleContactAgent,
    formatPrice,
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group transition-all duration-300 hover:-translate-y-1 text-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img
            src={property.image}
            alt={property.alt}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              imageLoaded && isHovered ? "scale-105" : "scale-100"
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {property.featured && (
              <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                <Star className="w-3 h-3 mr-1" />
                {t.featured}
              </div>
            )}
            <div className="bg-white/95 text-slate-700 px-2 py-1 rounded-full text-xs">
              {property.type}
            </div>
          </div>

          {/* Rating */}
          <div className="absolute top-3 right-3 bg-white/95 text-slate-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {property.rating}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(property.id);
            }}
            className="absolute top-12 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md"
          >
            <Heart
              className={`w-4 h-4 ${
                wishlist.has(property.id)
                  ? "text-red-500 fill-current"
                  : "text-slate-600"
              }`}
            />
          </button>

          {/* Price */}
          <div className="absolute bottom-3 left-3 text-lg font-bold text-white drop-shadow-lg">
            {formatPrice(property.price)}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-semibold text-slate-900 line-clamp-2 mb-1">
              {property.title}
            </h3>
            <div className="flex items-center text-slate-600 text-xs">
              <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex justify-between mb-4 text-xs text-slate-600 bg-slate-50 rounded-lg p-3">
            <div className="flex flex-col items-center">
              <Bed className="w-3 h-3 mb-1 text-slate-500" />
              <span className="font-medium">{property.bedrooms}</span>
              <span className="text-xs text-slate-500">{t.bedrooms}</span>
            </div>
            <div className="flex flex-col items-center">
              <Bath className="w-3 h-3 mb-1 text-slate-500" />
              <span className="font-medium">{property.bathrooms}</span>
              <span className="text-xs text-slate-500">{t.bathrooms}</span>
            </div>
            <div className="flex flex-col items-center">
              <Square className="w-3 h-3 mb-1 text-slate-500" />
              <span className="font-medium">
                {property.area.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">{t.sqft}</span>
            </div>
          </div>

          {/* Agent */}
          <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center min-w-0">
              <img
                src={property.agent.avatar}
                alt={property.agent.avatarAlt}
                className="w-8 h-8 rounded-full object-cover mr-2 border border-white shadow-sm"
              />
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 text-xs truncate">
                  {property.agent.name}
                </div>
                <div className="text-xs text-slate-500">Agent</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleContactAgent(property.agent.phone);
              }}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg p-2"
            >
              <MessageCircle className="w-3 h-3" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs py-2"
              onClick={() => handleViewDetails(property.id)}
            >
              {t.viewDetails}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleContactAgent(property.agent.phone);
              }}
              className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-slate-200 p-2"
            >
              <Phone className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

PropertyCard.displayName = "PropertyCard";
export default PropertyCard;
