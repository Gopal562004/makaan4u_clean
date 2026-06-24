import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";
import Button from "../../../components/ui/Button";
import PropertyCard from "../../property-listings/components/PropertyCard";
import { getTopFeaturedProperties } from "../../../lib/mongo/services/propertyService";

const TrendingProperties = memo(() => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [wishlist, setWishlist] = useState(new Set());
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---- Load Language ----
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(savedLanguage);
  }, []);

  // ---- Fetch Featured Properties ----
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await getTopFeaturedProperties();
        setProperties(res.properties || []);
      } catch (error) {
        console.error("Error loading featured properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // ---- Translations ----
  const content = {
    en: {
      title: "Trending Properties",
      subtitle: "Discover the most sought-after homes in premium locations",
      viewAll: "View All Properties",
    },
    hi: {
      title: "ट्रेंडिंग संपत्तियां",
      subtitle: "प्रीमियम स्थानों में सबसे अधिक मांग वाले घरों की खोज करें",
      viewAll: "सभी संपत्तियां देखें",
    },
    mr: {
      title: "ट्रेंडिंग मालमत्ता",
      subtitle: "प्रीमियम ठिकाणी सर्वाधिक मागणी असलेल्या घरांचा शोध घ्या",
      viewAll: "सर्व मालमत्ता पहा",
    },
  };

  const t = content?.[currentLanguage] || content.en;

  // ---- Wishlist Toggle ----
  const toggleWishlist = useCallback((propertyId) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      newWishlist.has(propertyId)
        ? newWishlist.delete(propertyId)
        : newWishlist.add(propertyId);
      return newWishlist;
    });
  }, []);

  const SkeletonCard = () => (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-52 bg-gray-200 w-full"></div>
      <div className="p-4 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex justify-between mt-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-rose-50 text-rose-600 rounded-sm text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 border border-rose-100 shadow-sm">
              <Flame className="w-3.5 h-3.5 fill-rose-600" />
              Hot Right Now
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-3 tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="text-base text-gray-600 font-light">
              {t.subtitle}
            </p>
          </div>
          <div className="mt-5 md:mt-0">
            <Button
              variant="outline"
              onClick={() => navigate("/property-listings")}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none shadow-md px-6 py-2.5 rounded-md font-bold tracking-wide text-sm transition-all duration-300"
            >
              {t.viewAll} 
              <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Loader */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Properties Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onWishlistToggle={toggleWishlist}
                isWishlisted={wishlist.has(property._id)}
                viewMode="grid"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

TrendingProperties.displayName = "TrendingProperties";
export default TrendingProperties;
