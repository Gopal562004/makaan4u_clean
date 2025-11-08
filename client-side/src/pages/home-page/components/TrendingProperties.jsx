// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Icon from "../../../components/AppIcon";
// import Image from "../../../components/AppImage";
// import Button from "../../../components/ui/Button";

// const TrendingProperties = () => {
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
//       image: "https://images.unsplash.com/photo-1617052167777-f0f26b5c54f4",
//       alt: "Modern luxury villa with white exterior walls, large windows, and landscaped garden in upscale neighborhood",
//       agent: {
//         name: "Priya Sharma",
//         phone: "+91 98765 43210",
//         avatar: "https://images.unsplash.com/photo-1637562772116-e01cda44fce8",
//         avatarAlt:
//           "Professional headshot of Indian woman with shoulder-length black hair in navy blazer",
//       },
//       featured: true,
//       type: "Villa",
//     },
//     {
//       id: 2,
//       title: "Modern 3BHK Apartment",
//       price: 12500000,
//       location: "Koregaon Park, Pune",
//       bedrooms: 3,
//       bathrooms: 2,
//       area: 1450,
//       image: "https://images.unsplash.com/photo-1665062801030-3d0425a9ee16",
//       alt: "Contemporary apartment building with glass facade and modern architectural design in urban setting",
//       agent: {
//         name: "Rajesh Kumar",
//         phone: "+91 87654 32109",
//         avatar: "https://images.unsplash.com/photo-1554169951-178836cd6bc0",
//         avatarAlt:
//           "Professional headshot of middle-aged Indian man with mustache in white shirt and tie",
//       },
//       featured: false,
//       type: "Apartment",
//     },
//     {
//       id: 3,
//       title: "Spacious Independent House",
//       price: 8500000,
//       location: "Whitefield, Bangalore",
//       bedrooms: 3,
//       bathrooms: 3,
//       area: 1800,
//       image: "https://images.unsplash.com/photo-1712263841020-baa4466f9917",
//       alt: "Traditional independent house with red tile roof, white walls, and front garden with trees",
//       agent: {
//         name: "Anita Reddy",
//         phone: "+91 76543 21098",
//         avatar: "https://images.unsplash.com/photo-1631268088758-3e1fe5346e0c",
//         avatarAlt:
//           "Professional headshot of young Indian woman with long black hair in blue formal shirt",
//       },
//       featured: true,
//       type: "House",
//     },
//     {
//       id: 4,
//       title: "Premium 2BHK with Amenities",
//       price: 9800000,
//       location: "Gurgaon Sector 54, Delhi NCR",
//       bedrooms: 2,
//       bathrooms: 2,
//       area: 1200,
//       image: "https://images.unsplash.com/photo-1585810914222-d75f84ff9eb6",
//       alt: "High-rise apartment complex with modern glass and steel construction and landscaped entrance",
//       agent: {
//         name: "Vikram Singh",
//         phone: "+91 65432 10987",
//         avatar: "https://images.unsplash.com/photo-1714974528889-d51109fb6ae9",
//         avatarAlt:
//           "Professional headshot of Indian man with beard wearing dark suit and tie",
//       },
//       featured: false,
//       type: "Apartment",
//     },
//     {
//       id: 5,
//       title: "Sea View Penthouse",
//       price: 75000000,
//       location: "Marine Drive, Mumbai",
//       bedrooms: 4,
//       bathrooms: 4,
//       area: 3200,
//       image: "https://images.unsplash.com/photo-1684238350624-178049e1d27e",
//       alt: "Luxury penthouse terrace with panoramic city and ocean views, modern furniture and glass railings",
//       agent: {
//         name: "Meera Joshi",
//         phone: "+91 54321 09876",
//         avatar: "https://images.unsplash.com/photo-1654764745324-ac95545c9e91",
//         avatarAlt:
//           "Professional headshot of elegant Indian woman with styled hair in cream colored blazer",
//       },
//       featured: true,
//       type: "Penthouse",
//     },
//     {
//       id: 6,
//       title: "Garden Villa with Pool",
//       price: 32000000,
//       location: "Jubilee Hills, Hyderabad",
//       bedrooms: 5,
//       bathrooms: 4,
//       area: 2800,
//       image: "https://images.unsplash.com/photo-1647475892828-94fa221b7a60",
//       alt: "Elegant villa with swimming pool, manicured gardens, and Mediterranean-style architecture",
//       agent: {
//         name: "Arjun Patel",
//         phone: "+91 43210 98765",
//         avatar: "https://images.unsplash.com/photo-1524425963132-43b447a32f28",
//         avatarAlt:
//           "Professional headshot of young Indian man with clean shave in light blue dress shirt",
//       },
//       featured: false,
//       type: "Villa",
//     },
//   ];

//   const content = {
//     en: {
//       title: "Trending Properties",
//       subtitle: "Discover the most popular properties in prime locations",
//       viewAll: "View All Properties",
//       viewDetails: "View Details",
//       featured: "Featured",
//       bedrooms: "Bedrooms",
//       bathrooms: "Bathrooms",
//       sqft: "sq ft",
//       contactAgent: "Contact Agent",
//     },
//     hi: {
//       title: "ट्रेंडिंग संपत्तियां",
//       subtitle: "प्रमुख स्थानों में सबसे लोकप्रिय संपत्तियों की खोज करें",
//       viewAll: "सभी संपत्तियां देखें",
//       viewDetails: "विवरण देखें",
//       featured: "फीचर्ड",
//       bedrooms: "बेडरूम",
//       bathrooms: "बाथरूम",
//       sqft: "वर्ग फुट",
//       contactAgent: "एजेंट से संपर्क करें",
//     },
//     mr: {
//       title: "ट्रेंडिंग मालमत्ता",
//       subtitle: "प्रमुख ठिकाणी सर्वात लोकप्रिय मालमत्तांचा शोध घ्या",
//       viewAll: "सर्व मालमत्ता पहा",
//       viewDetails: "तपशील पहा",
//       featured: "वैशिष्ट्यीकृत",
//       bedrooms: "बेडरूम",
//       bathrooms: "बाथरूम",
//       sqft: "चौ फूट",
//       contactAgent: "एजेंटशी संपर्क साधा",
//     },
//   };

//   const t = content?.[currentLanguage] || content?.en;

//   const formatPrice = (price) => {
//     if (price >= 10000000) {
//       return `₹${(price / 10000000)?.toFixed(1)} Cr`;
//     } else if (price >= 100000) {
//       return `₹${(price / 100000)?.toFixed(1)} L`;
//     }
//     return `₹${price?.toLocaleString("en-IN")}`;
//   };

//   const toggleWishlist = (propertyId) => {
//     const newWishlist = new Set(wishlist);
//     if (newWishlist?.has(propertyId)) {
//       newWishlist?.delete(propertyId);
//     } else {
//       newWishlist?.add(propertyId);
//     }
//     setWishlist(newWishlist);
//   };

//   const handleViewDetails = (propertyId) => {
//     navigate(`/property-details/${propertyId}`);
//   };

//   const handleContactAgent = (phone) => {
//     window.open(
//       `https://wa.me/${phone?.replace(/\s+/g, "")?.replace("+", "")}`,
//       "_blank"
//     );
//   };

//   return (
//     <section className="py-16 bg-background">
//       <div className="max-w-7xl mx-auto px-4 lg:px-6">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
//             {t?.title}
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
//             {t?.subtitle}
//           </p>
//           <Button
//             variant="outline"
//             onClick={() => navigate("/property-listings")}
//             iconName="ArrowRight"
//             iconPosition="right"
//           >
//             {t?.viewAll}
//           </Button>
//         </div>

//         {/* Properties Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {properties?.map((property) => (
//             <div
//               key={property?.id}
//               className="bg-card border border-border rounded-xl shadow-subtle hover:shadow-moderate transition-all duration-300 overflow-hidden group"
//             >
//               {/* Property Image */}
//               <div className="relative h-64 overflow-hidden">
//                 <Image
//                   src={property?.image}
//                   alt={property?.alt}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />

//                 {/* Featured Badge */}
//                 {property?.featured && (
//                   <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
//                     {t?.featured}
//                   </div>
//                 )}

//                 {/* Wishlist Button */}
//                 <button
//                   onClick={() => toggleWishlist(property?.id)}
//                   className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
//                 >
//                   <Icon
//                     name="Heart"
//                     size={20}
//                     className={
//                       wishlist?.has(property?.id)
//                         ? "text-red-500 fill-current"
//                         : "text-gray-600"
//                     }
//                   />
//                 </button>
//               </div>

//               {/* Property Details */}
//               <div className="p-6">
//                 <div className="flex items-start justify-between mb-3">
//                   <h3 className="text-xl font-semibold text-foreground line-clamp-2 flex-1">
//                     {property?.title}
//                   </h3>
//                   <div className="text-right ml-4">
//                     <div className="text-2xl font-bold text-primary">
//                       {formatPrice(property?.price)}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center text-muted-foreground mb-4">
//                   <Icon name="MapPin" size={16} className="mr-2" />
//                   <span className="text-sm">{property?.location}</span>
//                 </div>

//                 {/* Property Features */}
//                 <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
//                   <div className="flex items-center">
//                     <Icon name="Bed" size={16} className="mr-1" />
//                     <span>
//                       {property?.bedrooms} {t?.bedrooms}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <Icon name="Bath" size={16} className="mr-1" />
//                     <span>
//                       {property?.bathrooms} {t?.bathrooms}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <Icon name="Square" size={16} className="mr-1" />
//                     <span>
//                       {property?.area?.toLocaleString()} {t?.sqft}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Agent Info */}
//                 <div className="flex items-center justify-between mb-6 p-3 bg-muted rounded-lg">
//                   <div className="flex items-center">
//                     <Image
//                       src={property?.agent?.avatar}
//                       alt={property?.agent?.avatarAlt}
//                       className="w-10 h-10 rounded-full object-cover mr-3"
//                     />

//                     <div>
//                       <div className="font-medium text-foreground text-sm">
//                         {property?.agent?.name}
//                       </div>
//                       <div className="text-xs text-muted-foreground">
//                         {property?.agent?.phone}
//                       </div>
//                     </div>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleContactAgent(property?.agent?.phone)}
//                     iconName="MessageCircle"
//                     iconPosition="left"
//                   >
//                     WhatsApp
//                   </Button>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex space-x-3">
//                   <Button
//                     variant="outline"
//                     className="flex-1"
//                     onClick={() => handleViewDetails(property?.id)}
//                   >
//                     {t?.viewDetails}
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => handleContactAgent(property?.agent?.phone)}
//                   >
//                     <Icon name="Phone" size={18} />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrendingProperties;
import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Crown } from "lucide-react";
import Button from "../../../components/ui/Button";
import PropertyCard from "./PropertyCard";

const TrendingProperties = memo(() => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [wishlist, setWishlist] = useState(new Set());

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(savedLanguage);
  }, []);

  const properties = [
    {
      id: 1,
      title: "Luxury Villa in Bandra West",
      price: 45000000,
      location: "Bandra West, Mumbai",
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      image:
        "https://images.unsplash.com/photo-1617052167777-f0f26b5c54f4?w=500",
      alt: "Modern luxury villa",
      agent: {
        name: "Priya Sharma",
        phone: "+91 98765 43210",
        avatar:
          "https://images.unsplash.com/photo-1637562772116-e01cda44fce8?w=100",
        avatarAlt: "Professional headshot",
      },
      featured: true,
      type: "Villa",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Modern 3BHK Apartment",
      price: 12500000,
      location: "Koregaon Park, Pune",
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
      image:
        "https://images.unsplash.com/photo-1665062801030-3d0425a9ee16?w=500",
      alt: "Contemporary apartment",
      agent: {
        name: "Rajesh Kumar",
        phone: "+91 87654 32109",
        avatar:
          "https://images.unsplash.com/photo-1554169951-178836cd6bc0?w=100",
        avatarAlt: "Professional headshot",
      },
      featured: false,
      type: "Apartment",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Spacious Independent House",
      price: 8500000,
      location: "Whitefield, Bangalore",
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      image:
        "https://images.unsplash.com/photo-1712263841020-baa4466f9917?w=500",
      alt: "Traditional house",
      agent: {
        name: "Anita Reddy",
        phone: "+91 76543 21098",
        avatar:
          "https://images.unsplash.com/photo-1631268088758-3e1fe5346e0c?w=100",
        avatarAlt: "Professional headshot",
      },
      featured: true,
      type: "House",
      rating: 4.8,
    },
    {
      id: 4,
      title: "Premium 2BHK with Amenities",
      price: 9800000,
      location: "Gurgaon Sector 54, Delhi NCR",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image:
        "https://images.unsplash.com/photo-1585810914222-d75f84ff9eb6?w=500",
      alt: "High-rise apartment",
      agent: {
        name: "Vikram Singh",
        phone: "+91 65432 10987",
        avatar:
          "https://images.unsplash.com/photo-1714974528889-d51109fb6ae9?w=100",
        avatarAlt: "Professional headshot",
      },
      featured: false,
      type: "Apartment",
      rating: 4.6,
    },
    {
      id: 5,
      title: "Sea View Penthouse",
      price: 75000000,
      location: "Marine Drive, Mumbai",
      bedrooms: 4,
      bathrooms: 4,
      area: 3200,
      image:
        "https://images.unsplash.com/photo-1684238350624-178049e1d27e?w=500",
      alt: "Luxury penthouse",
      agent: {
        name: "Meera Joshi",
        phone: "+91 54321 09876",
        avatar:
          "https://images.unsplash.com/photo-1654764745324-ac95545c9e91?w=100",
        avatarAlt: "Professional headshot",
      },
      featured: true,
      type: "Penthouse",
      rating: 5.0,
    },
    {
      id: 6,
      title: "Garden Villa with Pool",
      price: 32000000,
      location: "Jubilee Hills, Hyderabad",
      bedrooms: 5,
      bathrooms: 4,
      area: 2800,
      image:
        "https://images.unsplash.com/photo-1647475892828-94fa221b7a60?w=500",
      alt: "Elegant villa",
      agent: {
        name: "Arjun Patel",
        phone: "+91 43210 98765",
        avatar:
          "https://images.unsplash.com/photo-1524425963132-43b447a32f28?w=100",
        avatarAlt: "Professional headshot",
      },
      featured: false,
      type: "Villa",
      rating: 4.9,
    },
  ];

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
      featured: "फीचर्ड",
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

  const t = content?.[currentLanguage] || content?.en;

  const formatPrice = useCallback((price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000)?.toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000)?.toFixed(1)} L`;
    }
    return `₹${price?.toLocaleString("en-IN")}`;
  }, []);

  const toggleWishlist = useCallback((propertyId) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(propertyId)) {
        newWishlist.delete(propertyId);
      } else {
        newWishlist.add(propertyId);
      }
      return newWishlist;
    });
  }, []);

  const handleViewDetails = useCallback(
    (propertyId) => {
      navigate(`/property-details/${propertyId}`);
    },
    [navigate]
  );

  const handleContactAgent = useCallback((phone) => {
    window.open(
      `https://wa.me/${phone?.replace(/\s+/g, "")?.replace("+", "")}`,
      "_blank"
    );
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6 border border-blue-100">
            <Crown className="w-4 h-4" />
            Exclusive Collection
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {t?.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t?.subtitle}
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/property-listings")}
            className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-8 py-3 rounded-xl font-semibold"
          >
            <span>{t?.viewAll}</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Properties Grid - SIMPLIFIED */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
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