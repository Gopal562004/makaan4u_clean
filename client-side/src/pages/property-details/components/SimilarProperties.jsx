import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import { getAllProperties } from "../../../lib/mongo/services/propertyService";
import SimilarPropertiesSkeleton from "../../../components/loading/SimilarPropertiesSkeleton"; // Import skeleton

const SimilarProperties = ({ currentProperty }) => {
  const navigate = useNavigate();
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Current property in SimilarProperties:", currentProperty);

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
    return `₹${price?.toLocaleString("en-IN")}`;
  };

  const fetchSimilarProperties = async () => {
    try {
      if (!currentProperty) return;

      const city =
        typeof currentProperty.location === "string"
          ? currentProperty.location
          : currentProperty.location?.city;

      let finalList = [];

      /* ------------------------------------------------------------
         1️⃣ FIRST ATTEMPT — match by city + broad price range
      ------------------------------------------------------------ */
      const filters1 = {
        city: city,
        minPrice: currentProperty.price * 0.5,
        maxPrice: currentProperty.price * 1.5,
        limit: 6,
      };

      const res1 = await getAllProperties(filters1);
      let list1 =
        res1?.properties?.filter(
          (p) => String(p._id) !== String(currentProperty.id)
        ) || [];

      if (list1.length >= 3) {
        finalList = list1;
      }

      /* ------------------------------------------------------------
         2️⃣ SECOND ATTEMPT — match by city only (ignore price)
      ------------------------------------------------------------ */
      if (finalList.length < 3) {
        const res2 = await getAllProperties({ city, limit: 6 });
        let list2 =
          res2?.properties?.filter(
            (p) => String(p._id) !== String(currentProperty.id)
          ) || [];

        if (list2.length >= 3) {
          finalList = list2;
        }
      }

      /* ------------------------------------------------------------
         3️⃣ FINAL FALLBACK — fetch ANY 6 properties
      ------------------------------------------------------------ */
      if (finalList.length < 3) {
        const res3 = await getAllProperties({ limit: 6 });
        let list3 =
          res3?.properties?.filter(
            (p) => String(p._id) !== String(currentProperty.id)
          ) || [];

        finalList = list3;
      }
      console.log("Similar properties res1:", res1);
      console.log("Similar properties res2:", res1);
      console.log("Similar properties res3:", res1);
      setSimilarProperties(finalList.slice(0, 3)); // always show 3
    } catch (error) {
      console.error("Error fetching similar properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSimilarProperties();
  }, [currentProperty]);

  const handleViewProperty = (propertySlug) => {
    navigate(`/property-details/${propertySlug}`);
    window.scrollTo(0, 0);
  };

  // 🔥 SKELETON LOADING
  if (loading) {
    return <SimilarPropertiesSkeleton />;
  }

  if (!similarProperties.length) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">
          Similar Properties
        </h3>
        <p className="text-muted-foreground text-center py-8">
          No similar properties found.
        </p>
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
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground">
        Similar Properties
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {similarProperties.map((property) => (
          <div
            key={property._id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={property.images?.[0]?.url}
                alt={property.images?.[0]?.altText || property.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-4">
              <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                {property.title}
              </h4>

              <div className="flex items-center text-muted-foreground mb-3">
                <Icon name="MapPin" size={14} className="mr-1" />
                <span className="text-sm">
                  {property.location?.address ||
                    property.location?.city ||
                    "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-primary">
                  {formatPrice(property.price)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {property.specifications?.type}
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Bed" size={14} />
                  <span>{property.specifications?.bedrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Bath" size={14} />
                  <span>{property.specifications?.bathrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Square" size={14} />
                  <span>{property.specifications?.area} sq ft</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => handleViewProperty(property.slug)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

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