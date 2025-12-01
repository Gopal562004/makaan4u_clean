// import React, { useState, useEffect, useCallback, memo } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowRight, Crown } from "lucide-react";
// import Button from "../../../components/ui/Button";
// import PropertyCard from "./PropertyCard";

// const TrendingProperties = memo(() => {
//   const navigate = useNavigate();
//   const [currentLanguage, setCurrentLanguage] = useState("en");
//   const [wishlist, setWishlist] = useState(new Set());

//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("language") || "en";
//     setCurrentLanguage(savedLanguage);
//   }, []);

//   const properties = [
//     {
//       id: 1,
//       title: "Luxury Villa in Bandra West",
//       price: 45000000,
//       location: "Bandra West, Mumbai",
//       bedrooms: 4,
//       bathrooms: 3,
//       area: 2500,
//       image:
//         "https://images.unsplash.com/photo-1617052167777-f0f26b5c54f4?w=500",
//       alt: "Modern luxury villa",
//       agent: {
//         name: "Priya Sharma",
//         phone: "+91 98765 43210",
//         avatar:
//           "https://images.unsplash.com/photo-1637562772116-e01cda44fce8?w=100",
//         avatarAlt: "Professional headshot",
//       },
//       featured: true,
//       type: "Villa",
//       rating: 4.9,
//     },
//     {
//       id: 2,
//       title: "Modern 3BHK Apartment",
//       price: 12500000,
//       location: "Koregaon Park, Pune",
//       bedrooms: 3,
//       bathrooms: 2,
//       area: 1450,
//       image:
//         "https://images.unsplash.com/photo-1665062801030-3d0425a9ee16?w=500",
//       alt: "Contemporary apartment",
//       agent: {
//         name: "Rajesh Kumar",
//         phone: "+91 87654 32109",
//         avatar:
//           "https://images.unsplash.com/photo-1554169951-178836cd6bc0?w=100",
//         avatarAlt: "Professional headshot",
//       },
//       featured: false,
//       type: "Apartment",
//       rating: 4.7,
//     },
//     {
//       id: 3,
//       title: "Spacious Independent House",
//       price: 8500000,
//       location: "Whitefield, Bangalore",
//       bedrooms: 3,
//       bathrooms: 3,
//       area: 1800,
//       image:
//         "https://images.unsplash.com/photo-1712263841020-baa4466f9917?w=500",
//       alt: "Traditional house",
//       agent: {
//         name: "Anita Reddy",
//         phone: "+91 76543 21098",
//         avatar:
//           "https://images.unsplash.com/photo-1631268088758-3e1fe5346e0c?w=100",
//         avatarAlt: "Professional headshot",
//       },
//       featured: true,
//       type: "House",
//       rating: 4.8,
//     },
//     {
//       id: 4,
//       title: "Premium 2BHK with Amenities",
//       price: 9800000,
//       location: "Gurgaon Sector 54, Delhi NCR",
//       bedrooms: 2,
//       bathrooms: 2,
//       area: 1200,
//       image:
//         "https://images.unsplash.com/photo-1585810914222-d75f84ff9eb6?w=500",
//       alt: "High-rise apartment",
//       agent: {
//         name: "Vikram Singh",
//         phone: "+91 65432 10987",
//         avatar:
//           "https://images.unsplash.com/photo-1714974528889-d51109fb6ae9?w=100",
//         avatarAlt: "Professional headshot",
//       },
//       featured: false,
//       type: "Apartment",
//       rating: 4.6,
//     },
//     {
//       id: 5,
//       title: "Sea View Penthouse",
//       price: 75000000,
//       location: "Marine Drive, Mumbai",
//       bedrooms: 4,
//       bathrooms: 4,
//       area: 3200,
//       image:
//         "https://images.unsplash.com/photo-1684238350624-178049e1d27e?w=500",
//       alt: "Luxury penthouse",
//       agent: {
//         name: "Meera Joshi",
//         phone: "+91 54321 09876",
//         avatar:
//           "https://images.unsplash.com/photo-1654764745324-ac95545c9e91?w=100",
//         avatarAlt: "Professional headshot",
//       },
//       featured: true,
//       type: "Penthouse",
//       rating: 5.0,
//     },
//     {
//       id: 6,
//       title: "Garden Villa with Pool",
//       price: 32000000,
//       location: "Jubilee Hills, Hyderabad",
//       bedrooms: 5,
//       bathrooms: 4,
//       area: 2800,
//       image:
//         "https://images.unsplash.com/photo-1647475892828-94fa221b7a60?w=500",
//       alt: "Elegant villa",
//       agent: {
//         name: "Arjun Patel",
//         phone: "+91 43210 98765",
//         avatar:
//           "https://images.unsplash.com/photo-1524425963132-43b447a32f28?w=100",
//         avatarAlt: "Professional headshot",
//       },
//       featured: false,
//       type: "Villa",
//       rating: 4.9,
//     },
//   ];

//   const content = {
//     en: {
//       title: "Premium Properties",
//       subtitle: "Discover exceptional homes in prime locations across India",
//       viewAll: "View All Properties",
//       viewDetails: "View Details",
//       featured: "Featured",
//       bedrooms: "Bedrooms",
//       bathrooms: "Bathrooms",
//       sqft: "sq ft",
//       contactAgent: "Contact Agent",
//     },
//     hi: {
//       title: "प्रीमियम संपत्तियां",
//       subtitle: "भारत के प्रमुख स्थानों में उत्कृष्ट घरों की खोज करें",
//       viewAll: "सभी संपत्तियां देखें",
//       viewDetails: "विवरण देखें",
//       featured: "फीचर्ड",
//       bedrooms: "बेडरूम",
//       bathrooms: "बाथरूम",
//       sqft: "वर्ग फुट",
//       contactAgent: "एजेंट से संपर्क करें",
//     },
//     mr: {
//       title: "प्रीमियम मालमत्ता",
//       subtitle: "भारतातील प्रमुख ठिकाणी उत्कृष्ट घरांचा शोध घ्या",
//       viewAll: "सर्व मालमत्ता पहा",
//       viewDetails: "तपशील पहा",
//       featured: "वैशिष्ट्यीकृत",
//       bedrooms: "बेडरूम",
//       bathrooms: "बाथरूम",
//       sqft: "चौ फुट",
//       contactAgent: "एजेंटशी संपर्क साधा",
//     },
//   };

//   const t = content?.[currentLanguage] || content?.en;

//   const formatPrice = useCallback((price) => {
//     if (price >= 10000000) {
//       return `₹${(price / 10000000)?.toFixed(1)} Cr`;
//     } else if (price >= 100000) {
//       return `₹${(price / 100000)?.toFixed(1)} L`;
//     }
//     return `₹${price?.toLocaleString("en-IN")}`;
//   }, []);

//   const toggleWishlist = useCallback((propertyId) => {
//     setWishlist((prev) => {
//       const newWishlist = new Set(prev);
//       if (newWishlist.has(propertyId)) {
//         newWishlist.delete(propertyId);
//       } else {
//         newWishlist.add(propertyId);
//       }
//       return newWishlist;
//     });
//   }, []);

//   const handleViewDetails = useCallback(
//     (propertyId) => {
//       navigate(`/property-details/${propertyId}`);
//     },
//     [navigate]
//   );

//   const handleContactAgent = useCallback((phone) => {
//     window.open(
//       `https://wa.me/${phone?.replace(/\s+/g, "")?.replace("+", "")}`,
//       "_blank"
//     );
//   }, []);

//   return (
//     <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 lg:px-6">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6 border border-blue-100">
//             <Crown className="w-4 h-4" />
//             Exclusive Collection
//           </div>

//           <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
//             {t?.title}
//           </h2>
//           <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
//             {t?.subtitle}
//           </p>
//           <Button
//             variant="outline"
//             onClick={() => navigate("/property-listings")}
//             className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-8 py-3 rounded-xl font-semibold"
//           >
//             <span>{t?.viewAll}</span>
//             <ArrowRight className="w-5 h-5 ml-2" />
//           </Button>
//         </div>

//         {/* Properties Grid - SIMPLIFIED */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {properties.map((property) => (
//             <PropertyCard
//               key={property.id}
//               property={property}
//               t={t}
//               wishlist={wishlist}
//               toggleWishlist={toggleWishlist}
//               handleViewDetails={handleViewDetails}
//               handleContactAgent={handleContactAgent}
//               formatPrice={formatPrice}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// });

// TrendingProperties.displayName = "TrendingProperties";

// export default TrendingProperties;

import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Crown } from "lucide-react";
import Button from "../../../components/ui/Button";
import PropertyCard from "./PropertyCard";
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
      title: "Premium Properties",
      subtitle: "Discover exceptional homes in prime locations across India",
      viewAll: "View All Properties",
      viewDetails: "View Details",
      featured: "Featured",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      sqft: "sq ft",
      contactAgent: "Contact Agent",
    },
    hi: {
      title: "प्रीमियम संपत्तियां",
      subtitle: "भारत के प्रमुख स्थानों में उत्कृष्ट घरों की खोज करें",
      viewAll: "सभी संपत्तियां देखें",
      viewDetails: "विवरण देखें",
      featured: "फ़ीचर्ड",
      bedrooms: "बेडरूम",
      bathrooms: "बाथरूम",
      sqft: "वर्ग फुट",
      contactAgent: "एजेंट से संपर्क करें",
    },
    mr: {
      title: "प्रीमियम मालमत्ता",
      subtitle: "भारतातील प्रमुख ठिकाणी उत्कृष्ट घरांचा शोध घ्या",
      viewAll: "सर्व मालमत्ता पहा",
      viewDetails: "तपशील पहा",
      featured: "वैशिष्ट्यीकृत",
      bedrooms: "बेडरूम",
      bathrooms: "बाथरूम",
      sqft: "चौ फुट",
      contactAgent: "एजेंटशी संपर्क साधा",
    },
  };

  const t = content?.[currentLanguage] || content.en;

  // ---- Price Formatter ----
  const formatPrice = useCallback((price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
    return `₹${price?.toLocaleString("en-IN")}`;
  }, []);

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

  // ---- View Details ----
  const handleViewDetails = (slug) => {
    navigate(`/property-details/${slug}`);
  };

  // ---- Contact Agent ----
  const handleContactAgent = (phone) => {
    if (!phone) return;
    window.open(
      `https://wa.me/${phone.replace(/\s+/g, "").replace("+", "")}`,
      "_blank"
    );
  };
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
    {/* Image Skeleton */}
    <div className="h-48 bg-slate-200 w-full"></div>

    <div className="p-4 space-y-4">
      {/* Title */}
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>

      {/* Location */}
      <div className="h-3 bg-slate-200 rounded w-1/2"></div>

      {/* Specs */}
      <div className="flex justify-between bg-slate-100 p-3 rounded-lg">
        <div className="space-y-2 flex-1 px-2">
          <div className="h-3 bg-slate-200 rounded w-5"></div>
          <div className="h-3 bg-slate-200 rounded w-8"></div>
        </div>
        <div className="space-y-2 flex-1 px-2">
          <div className="h-3 bg-slate-200 rounded w-5"></div>
          <div className="h-3 bg-slate-200 rounded w-8"></div>
        </div>
        <div className="space-y-2 flex-1 px-2">
          <div className="h-3 bg-slate-200 rounded w-5"></div>
          <div className="h-3 bg-slate-200 rounded w-8"></div>
        </div>
      </div>

      {/* Agent */}
      <div className="flex items-center justify-between bg-slate-100 p-3 rounded-lg">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-slate-300 rounded-full mr-2"></div>
          <div>
            <div className="h-3 bg-slate-200 rounded w-16"></div>
            <div className="h-3 bg-slate-200 rounded w-10 mt-1"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <div className="flex-1 h-8 bg-slate-200 rounded-lg"></div>
        <div className="w-10 h-8 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6 border border-blue-100">
            <Crown className="w-4 h-4" />
            Exclusive Collection
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            {t.subtitle}
          </p>

          <Button
            variant="outline"
            onClick={() => navigate("/property-listings")}
            className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-xl font-semibold"
          >
            {t.viewAll} <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="py-10 text-center text-slate-500 text-lg">
            Loading premium properties…
          </div>
        )}

        {/* Properties Grid */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                t={t}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                handleViewDetails={handleViewDetails}
                handleContactAgent={handleContactAgent}
                formatPrice={formatPrice}
              />
            ))}
        </div>
      </div>
    </section>
  );
});

TrendingProperties.displayName = "TrendingProperties";
export default TrendingProperties;
