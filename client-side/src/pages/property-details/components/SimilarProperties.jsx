import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const SimilarProperties = ({ currentPropertyId }) => {
  const navigate = useNavigate();

  const similarProperties = [
    {
      id: 2,
      title: "Modern 3BHK Apartment in Bandra West",
      price: 18500000,
      location: "Bandra West, Mumbai",
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1721614463238-c327d3d42ccf",
      imageAlt:
        "Modern apartment living room with contemporary furniture and large windows",
      agent: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1733737272264-6af8f1aa41fc",
        avatarAlt:
          "Professional headshot of Indian woman with long black hair in business attire",
      },
    },
    {
      id: 3,
      title: "Luxury Villa with Garden in Juhu",
      price: 45000000,
      location: "Juhu, Mumbai",
      bedrooms: 4,
      bathrooms: 4,
      area: 3200,
      type: "Villa",
      image: "https://images.unsplash.com/photo-1689853912773-1cf88e58629d",
      imageAlt:
        "Luxury villa exterior with manicured garden and modern architecture",
      agent: {
        name: "Arjun Patel",
        avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
        avatarAlt:
          "Professional headshot of Indian man with short black hair in navy suit",
      },
    },
    {
      id: 4,
      title: "Spacious 2BHK with Sea View in Worli",
      price: 22000000,
      location: "Worli, Mumbai",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1633579434377-d0dfbf3f51f8",
      imageAlt: "Apartment balcony with sea view and modern outdoor furniture",
      agent: {
        name: "Sneha Reddy",
        avatar: "https://images.unsplash.com/photo-1726335560453-a6fb6746f83a",
        avatarAlt:
          "Professional headshot of South Indian woman with shoulder-length hair in blazer",
      },
    },
  ];

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000)?.toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000)?.toFixed(1)} L`;
    }
    return `₹${price?.toLocaleString("en-IN")}`;
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/property-details?id=${propertyId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground">
        Similar Properties
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProperties?.map((property) => (
          <div
            key={property?.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-moderate transition-all duration-200"
          >
            {/* Property Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={property?.image}
                alt={property?.imageAlt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute top-3 right-3">
                <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Icon
                    name="Heart"
                    size={16}
                    className="text-muted-foreground"
                  />
                </button>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-4">
              <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                {property?.title}
              </h4>

              <div className="flex items-center text-muted-foreground mb-3">
                <Icon name="MapPin" size={14} className="mr-1" />
                <span className="text-sm">{property?.location}</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-primary">
                  {formatPrice(property?.price)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {property?.type}
                </span>
              </div>

              {/* Property Specs */}
              <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Bed" size={14} />
                  <span>{property?.bedrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Bath" size={14} />
                  <span>{property?.bathrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Square" size={14} />
                  <span>{property?.area} sq ft</span>
                </div>
              </div>

              {/* Agent Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={property?.agent?.avatar}
                      alt={property?.agent?.avatarAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {property?.agent?.name}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewProperty(property?.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View More Button */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => navigate("/property-listings")}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View More Properties
        </Button>
      </div>
    </div>
  );
};

export default SimilarProperties;
