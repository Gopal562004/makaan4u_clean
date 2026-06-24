import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import { getAllProperties } from "../../../lib/mongo/services/propertyService";
import SimilarPropertiesSkeleton from "../../../components/loading/SimilarPropertiesSkeleton"; // Import skeleton
import PropertyCard from "../../property-listings/components/PropertyCard";
import { useCurrencyFormatter } from "../../../hooks/useCurrencyFormatter";

const SimilarProperties = ({ currentProperty }) => {
  const navigate = useNavigate();
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrencyFormatter();

  console.log("Current property in SimilarProperties:", currentProperty);

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
    <div className="bg-white border border-gray-200 shadow-sm rounded-md p-6 animate-in fade-in duration-500 mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Similar Properties
          </h3>
          <p className="text-gray-500 text-sm mt-1 font-medium">Explore other properties you might love</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProperties.map((property) => (
          <PropertyCard key={property._id} property={property} viewMode="grid" />
        ))}
      </div>

      <div className="text-center mt-10">
        <Button
          variant="outline"
          onClick={() => navigate("/property-listings")}
          iconName="ArrowRight"
          iconPosition="right"
          className="border-gray-300 text-gray-800 hover:bg-gray-50 hover:text-gray-900 rounded font-semibold uppercase tracking-wider px-8 py-3 transition-all duration-300 text-xs"
        >
          View More Properties
        </Button>
      </div>
    </div>
  );
};

export default SimilarProperties;