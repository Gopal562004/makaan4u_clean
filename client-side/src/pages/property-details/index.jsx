// // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { Helmet } from "react-helmet";
// // import Header from "../../components/ui/Header";
// // import FloatingChat from "../../components/ui/FloatingChat";
// // import PropertyImageGallery from "./components/PropertyImageGallery";
// // import PropertyInfo from "./components/PropertyInfo";
// // import AgentCard from "./components/AgentCard";
// // import AppointmentModal from "./components/AppointmentModal";
// // import PropertyLocation from "./components/PropertyLocation";
// // import SimilarProperties from "./components/SimilarProperties";
// // import PropertyActions from "./components/PropertyActions";
// // import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
// // import Icon from "../../components/AppIcon";
// // import Button from "../../components/ui/Button";
// // import { getPropertyBySlug } from "../../lib/mongo/services/propertyService";
// // import { AlertCircle } from "lucide-react";

// // // 🔥 IMPORT SKELETON COMPONENT
// // import PropertyDetailsSkeleton from "../../components/loading/PropertyDetailsSkeleton";

// // // 🔥 ADD THESE IMPORTS
// // import { usePerformanceMonitor } from "../../hooks/usePerformanceMonitor";
// // import { checkPerformanceBudget } from "../../utils/performanceBudget";
// // import { trackSEOEvents } from "../../utils/analytics";
// // import { optimizeImageUrl } from "../../utils/imageOptimizer";

// // const PropertyDetails = () => {
// //   const { slug } = useParams();
// //   const navigate = useNavigate();

// //   const [property, setProperty] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
// //   const [isChatOpen, setIsChatOpen] = useState(false);
// //   const [activeTab, setActiveTab] = useState("overview");
// //   const [user, setUser] = useState(null);

// //   // 🔥 INITIALIZE PERFORMANCE MONITORING
// //   usePerformanceMonitor();

// //   // 🔥 ENHANCED SEO META TAGS
// //   const getPropertyMetaTags = useCallback(() => {
// //     if (!property) return null;

// //     const title = `🏠 ${property.title} | ${property.bedrooms}BHK ${
// //       property.type
// //     } in ${property.location} | ₹${
// //       property.price?.toLocaleString("en-IN") || "Price on Request"
// //     }`;

// //     const description = `✅ Verified ${property.bedrooms}BHK ${
// //       property.type
// //     } in ${property.location}. ${property.area} sq ft • ${
// //       property.bathrooms
// //     } Bath • ${property.amenities?.slice(0, 3).join(" • ")}. 📞 Contact ${
// //       property.agent?.name
// //     } for viewing. Instant booking available.`;

// //     const currentUrl = `${window.location.origin}/property/${slug}`;
// //     const featuredImage = optimizeImageUrl(
// //       property.images?.[0]?.url || "/images/property-og-default.jpg",
// //       { width: 1200, quality: 85 }
// //     );

// //     return (
// //       <Helmet>
// //         {/* Primary Meta Tags */}
// //         <title>{title}</title>
// //         <meta name="description" content={description} />
// //         <meta
// //           name="robots"
// //           content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
// //         />
// //         <meta
// //           name="keywords"
// //           content={`${property.type}, ${property.location}, real estate, property for sale, ${property.bedrooms} bedroom, ${property.area} sq ft, buy property, rent apartment`}
// //         />

// //         {/* Canonical URL */}
// //         <link rel="canonical" href={currentUrl} />

// //         {/* Open Graph / Facebook */}
// //         <meta property="og:type" content="real_estate.property" />
// //         <meta property="og:url" content={currentUrl} />
// //         <meta property="og:title" content={title} />
// //         <meta property="og:description" content={description} />
// //         <meta property="og:image" content={featuredImage} />
// //         <meta property="og:image:width" content="1200" />
// //         <meta property="og:image:height" content="630" />
// //         <meta
// //           property="og:image:alt"
// //           content={`Main image of ${property.title}`}
// //         />
// //         <meta property="og:site_name" content="Premium Real Estate Platform" />
// //         <meta property="og:locale" content="en_IN" />
// //         <meta property="og:price:amount" content={property.price?.toString()} />
// //         <meta property="og:price:currency" content="INR" />
// //         <meta
// //           property="og:availability"
// //           content={property.status === "available" ? "instock" : "out of stock"}
// //         />

// //         {/* Twitter Cards */}
// //         <meta property="twitter:card" content="summary_large_image" />
// //         <meta property="twitter:url" content={currentUrl} />
// //         <meta property="twitter:title" content={title} />
// //         <meta property="twitter:description" content={description} />
// //         <meta property="twitter:image" content={featuredImage} />
// //         <meta
// //           property="twitter:image:alt"
// //           content={`Main image of ${property.title}`}
// //         />
// //         <meta property="twitter:site" content="@RealEstatePlatform" />
// //         <meta property="twitter:creator" content="@RealEstatePlatform" />

// //         {/* Enhanced Structured Data */}
// //         <script type="application/ld+json">
// //           {JSON.stringify({
// //             "@context": "https://schema.org",
// //             "@graph": [
// //               {
// //                 "@type": "RealEstateListing",
// //                 "@id": `${currentUrl}#realestatelisting`,
// //                 name: property.title,
// //                 description: property.description || description,
// //                 url: currentUrl,
// //                 image: property.images?.map((img) =>
// //                   optimizeImageUrl(img.url, { width: 800, quality: 85 })
// //                 ) || [featuredImage],
// //                 offers: {
// //                   "@type": "Offer",
// //                   price: property.price,
// //                   priceCurrency: "INR",
// //                   availability:
// //                     property.status === "available"
// //                       ? "https://schema.org/InStock"
// //                       : "https://schema.org/OutOfStock",
// //                   priceValidUntil: new Date(
// //                     Date.now() + 90 * 24 * 60 * 60 * 1000
// //                   )
// //                     .toISOString()
// //                     .split("T")[0],
// //                   url: currentUrl,
// //                   seller: {
// //                     "@type": "RealEstateAgent",
// //                     name: property.agent?.name,
// //                     telephone: property.agent?.phone,
// //                     email: property.agent?.email,
// //                   },
// //                 },
// //                 address: {
// //                   "@type": "PostalAddress",
// //                   streetAddress: property.address || property.location,
// //                   addressLocality:
// //                     typeof property.location === "object"
// //                       ? property.location.city
// //                       : property.location,
// //                   addressRegion:
// //                     typeof property.location === "object"
// //                       ? property.location.state
// //                       : "",
// //                   postalCode: property.pincode,
// //                   addressCountry: "IN",
// //                 },
// //                 geo: {
// //                   "@type": "GeoCoordinates",
// //                   latitude: property.coordinates?.lat || 0,
// //                   longitude: property.coordinates?.lng || 0,
// //                 },
// //                 numberOfRooms: property.bedrooms,
// //                 numberOfBathroomsTotal: property.bathrooms,
// //                 floorSize: {
// //                   "@type": "QuantitativeValue",
// //                   value: property.area,
// //                   unitCode: property.areaUnit === "sqft" ? "FTK" : "MTK",
// //                 },
// //                 petsAllowed:
// //                   property.amenities?.includes("Pet Friendly") || false,
// //                 yearBuilt: property.builtYear,
// //                 listingDate: property.listedDate,
// //                 provider: {
// //                   "@type": "RealEstateAgent",
// //                   name: property.agent?.name,
// //                   telephone: property.agent?.phone,
// //                   email: property.agent?.email,
// //                   rating: {
// //                     "@type": "AggregateRating",
// //                     ratingValue: property.agent?.rating || 4.5,
// //                     reviewCount: property.agent?.reviewCount || 25,
// //                     bestRating: 5,
// //                   },
// //                 },
// //                 amenityFeature: property.amenities?.map((amenity) => ({
// //                   "@type": "LocationFeatureSpecification",
// //                   name: amenity,
// //                   value: true,
// //                 })),
// //               },
// //               {
// //                 "@type": "WebPage",
// //                 "@id": `${currentUrl}#webpage`,
// //                 url: currentUrl,
// //                 name: title,
// //                 description: description,
// //                 isPartOf: {
// //                   "@id": `${window.location.origin}/#website`,
// //                 },
// //                 about: {
// //                   "@id": `${currentUrl}#realestatelisting`,
// //                 },
// //                 datePublished: property.listedDate,
// //                 dateModified: new Date().toISOString(),
// //                 breadcrumb: {
// //                   "@id": `${currentUrl}#breadcrumb`,
// //                 },
// //                 primaryImageOfPage: {
// //                   "@type": "ImageObject",
// //                   url: featuredImage,
// //                   width: 1200,
// //                   height: 630,
// //                 },
// //                 potentialAction: [
// //                   {
// //                     "@type": "ReadAction",
// //                     target: [currentUrl],
// //                   },
// //                 ],
// //               },
// //               {
// //                 "@type": "Organization",
// //                 "@id": `${window.location.origin}/#organization`,
// //                 name: "Premium Real Estate Platform",
// //                 url: window.location.origin,
// //                 logo: `${window.location.origin}/logo.png`,
// //                 description:
// //                   "India's leading real estate platform for buying, selling, and renting properties",
// //                 address: {
// //                   "@type": "PostalAddress",
// //                   addressLocality: "Mumbai",
// //                   addressRegion: "Maharashtra",
// //                   addressCountry: "IN",
// //                 },
// //                 contactPoint: {
// //                   "@type": "ContactPoint",
// //                   telephone: "+91-XXXXXXXXXX",
// //                   contactType: "customer service",
// //                   areaServed: "IN",
// //                   availableLanguage: ["English", "Hindi"],
// //                 },
// //                 sameAs: [
// //                   "https://www.facebook.com/realestateplatform",
// //                   "https://www.twitter.com/realestateplatform",
// //                   "https://www.linkedin.com/company/realestateplatform",
// //                 ],
// //               },
// //             ],
// //           })}
// //         </script>
// //       </Helmet>
// //     );
// //   }, [property, slug]);

// //   const transformPropertyData = useCallback((apiData) => {
// //     if (!apiData) return null;

// //     // Determine which agent data to use
// //     let agentData = {};

// //     if (
// //       apiData.agentInfo &&
// //       apiData.agentInfo.name &&
// //       apiData.agentInfo.name !== "Agent"
// //     ) {
// //       agentData = {
// //         id: apiData.agentInfo?._id || apiData._id,
// //         name: apiData.agentInfo.name,
// //         designation: apiData.agentInfo.designation,
// //         avatar: apiData.agentInfo.avatar,
// //         phone: apiData.agentInfo.phone,
// //         email: apiData.agentInfo.email,
// //         rating: apiData.agentInfo.rating,
// //         reviewCount: apiData.agentInfo.reviewCount,
// //         propertiesSold: apiData.agentInfo.propertiesSold,
// //         experience: apiData.agentInfo.experience,
// //         languages: apiData.agentInfo.languages,
// //       };
// //     } else if (apiData.postedBy && typeof apiData.postedBy === "object") {
// //       agentData = {
// //         id: apiData.postedBy._id,
// //         name: apiData.postedBy.name,
// //         designation: apiData.postedBy.designation,
// //         avatar: apiData.postedBy.avatar,
// //         phone: apiData.postedBy.phone,
// //         email: apiData.postedBy.email,
// //         rating: apiData.postedBy.rating?.average || 0,
// //         reviewCount: apiData.postedBy.rating?.totalReviews || 0,
// //         propertiesSold: apiData.postedBy.performance?.totalPropertiesSold || 0,
// //         experience: apiData.postedBy.experience
// //           ? `${apiData.postedBy.experience}+`
// //           : "0+",
// //         languages: apiData.postedBy.languages || ["English", "Hindi"],
// //       };
// //     } else {
// //       agentData = {
// //         id: apiData._id,
// //         name: "Agent",
// //         designation: "Property Consultant",
// //         avatar: "default-avatar.jpg",
// //         phone: "+919876543210",
// //         email: "agent@example.com",
// //         rating: 0,
// //         reviewCount: 0,
// //         propertiesSold: 0,
// //         experience: "0+",
// //         languages: ["English", "Hindi"],
// //       };
// //     }

// //     return {
// //       // Basic info
// //       id: apiData._id,
// //       title: apiData.title,
// //       description: apiData.description,
// //       price: apiData.price,
// //       originalPrice: apiData.originalPrice,

// //       // Location
// //       location:
// //         typeof apiData.location === "string"
// //           ? apiData.location
// //           : apiData.location?.address ||
// //             `${apiData.location?.city}, ${apiData.location?.state}`,
// //       address:
// //         typeof apiData.location === "string"
// //           ? apiData.location
// //           : apiData.location?.address,
// //       pincode:
// //         typeof apiData.location === "string" ? "" : apiData.location?.pincode,
// //       coordinates:
// //         typeof apiData.location === "string"
// //           ? { lat: 0, lng: 0 }
// //           : apiData.location?.coordinates || { lat: 0, lng: 0 },

// //       // Status
// //       status: apiData.status,
// //       featured: apiData.featured,

// //       // Specifications
// //       bedrooms: apiData.specifications?.bedrooms,
// //       bathrooms: apiData.specifications?.bathrooms,
// //       area: apiData.specifications?.area,
// //       areaUnit: apiData.specifications?.areaUnit || "sqft",
// //       type: apiData.specifications?.type,
// //       builtYear: apiData.specifications?.builtYear,
// //       parking: apiData.specifications?.parking,

// //       // Arrays
// //       amenities: apiData.amenities || [],
// //       features: apiData.features || [],
// //       // 🔥 ENHANCED: Optimized images
// //       images:
// //         apiData.images?.map((img) => ({
// //           ...img,
// //           url: optimizeImageUrl(img.url, { width: 1200, quality: 85 }),
// //         })) || [],

// //       // Agent data
// //       agent: {
// //         ...agentData,
// //         avatarAlt: `Professional photo of ${agentData.name}`,
// //         location:
// //           agentData.location ||
// //           (typeof apiData.location === "string"
// //             ? apiData.location
// //             : `${apiData.location?.city}, ${apiData.location?.state}`),
// //       },

// //       // Additional fields
// //       listedDate: apiData.listedDate || new Date().toISOString(),
// //       propertyId: apiData.propertyId || `RC${apiData._id?.slice(-6)}`,
// //     };
// //   }, []);

// //   const tabs = useMemo(
// //     () => [
// //       { id: "overview", label: "Overview", icon: "Home" },
// //       { id: "location", label: "Location", icon: "MapPin" },
// //       { id: "similar", label: "Similar Properties", icon: "Building2" },
// //     ],
// //     []
// //   );

// //   useEffect(() => {
// //     const fetchProperty = async () => {
// //       try {
// //         setLoading(true);

// //         if (!slug) {
// //           setError("No property slug found in URL");
// //           setLoading(false);
// //           return;
// //         }

// //         const res = await getPropertyBySlug(slug);
// //         console.log("API response for property:", res);
// //         const transformedProperty = transformPropertyData(res.property);
// //         setProperty(transformedProperty);
// //       } catch (err) {
// //         console.error("Error fetching property:", err);
// //         setError(err.message || "Failed to load property details.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProperty();

// //     // Mock user data
// //     setUser({
// //       name: "John Doe",
// //       email: "john.doe@example.com",
// //       role: "buyer",
// //     });
// //   }, [slug, transformPropertyData]);

// //   // 🔥 ADD TRACKING TO EFFECT
// //   useEffect(() => {
// //     if (property) {
// //       trackSEOEvents.propertyView(property);

// //       // Check performance after page loads
// //       setTimeout(() => {
// //         checkPerformanceBudget();
// //       }, 2000);
// //     }
// //   }, [property]);

// //   const handleScheduleViewing = useCallback(
// //     () => setIsAppointmentModalOpen(true),
// //     []
// //   );
// //   const handleCloseAppointmentModal = useCallback(
// //     () => setIsAppointmentModalOpen(false),
// //     []
// //   );
// //   const handleToggleChat = useCallback(
// //     () => setIsChatOpen((prev) => !prev),
// //     []
// //   );
// //   const handleTabChange = useCallback((tabId) => setActiveTab(tabId), []);
// //   const handleBackToListings = useCallback(
// //     () => navigate("/property-listings"),
// //     [navigate]
// //   );
// //   const handleHomeNavigate = useCallback(
// //     () => navigate("/home-page"),
// //     [navigate]
// //   );

// //   // 🔥 ENHANCED CONTACT HANDLERS WITH TRACKING
// //   const handleWhatsAppContact = useCallback(() => {
// //     if (!property?.agent?.phone) return;

// //     trackSEOEvents.contactAction(property, "whatsapp");

// //     const message = encodeURIComponent(
// //       `Hi ${property.agent.name}, I'm interested in the property: ${property.title}. Can we schedule a viewing?`
// //     );
// //     const phoneNumber = property.agent.phone.replace(/\D/g, "");
// //     window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
// //   }, [property]);

// //   const handleEmailContact = useCallback(() => {
// //     if (!property?.agent?.email) return;

// //     trackSEOEvents.contactAction(property, "email");

// //     const subject = encodeURIComponent(
// //       `Interest in Property: ${property.title}`
// //     );
// //     const body = encodeURIComponent(
// //       `Hi ${property.agent.name},\n\nI'm interested in the property: ${property.title}.\n\nCan you please provide more details and available viewing schedules?\n\nThank you!`
// //     );

// //     window.open(
// //       `mailto:${property.agent.email}?subject=${subject}&body=${body}`,
// //       "_blank"
// //     );
// //   }, [property]);

// //   const formattedPropertyId = useMemo(
// //     () => property?.propertyId || "",
// //     [property]
// //   );

// //   const tabContent = useMemo(() => {
// //     switch (activeTab) {
// //       case "overview":
// //         return <PropertyInfo property={property} />;
// //       case "location":
// //         return <PropertyLocation property={property} />;
// //       case "similar":
// //         return <SimilarProperties currentProperty={property} />;
// //       default:
// //         return <PropertyInfo property={property} />;
// //     }
// //   }, [activeTab, property]);

// //   // 🔥 SKELETON LOADING
// //   if (loading) {
// //     return <PropertyDetailsSkeleton />;
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-white flex items-center justify-center p-6">
// //         <Helmet>
// //           <title>Property Not Found | Premium Real Estate Platform</title>
// //           <meta
// //             name="description"
// //             content="The requested property could not be found."
// //           />
// //         </Helmet>
// //         <div className="text-center max-w-md">
// //           <div className="flex justify-center mb-6">
// //             <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
// //               <AlertCircle className="w-8 h-8 text-red-500" />
// //             </div>
// //           </div>
// //           <h2 className="text-xl font-semibold text-gray-900 mb-3">
// //             Something went wrong
// //           </h2>
// //           <p className="text-red-500 font-medium mb-2">{error}</p>
// //           <p className="text-gray-600 text-sm mb-6">
// //             We encountered an issue while loading this page.
// //           </p>
// //           <Button
// //             onClick={handleBackToListings}
// //             variant="primary"
// //             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
// //           >
// //             Back to Property Listings
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!property) {
// //     return (
// //       <div className="min-h-screen bg-background flex items-center justify-center">
// //         <Helmet>
// //           <title>Property Not Found | Premium Real Estate Platform</title>
// //           <meta
// //             name="description"
// //             content="The requested property could not be found."
// //           />
// //         </Helmet>
// //         <div className="text-center">
// //           <p className="text-muted-foreground mb-4">No property found.</p>
// //           <Button onClick={handleBackToListings}>
// //             Back to Property Listings
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* 🔥 SEO Meta Tags */}
// //       {getPropertyMetaTags()}

// //       <Header
// //         user={user}
// //         onLogout={() => navigate("/login")}
// //         onSearch={() => {}}
// //       />

// //       <main className="container mx-auto px-4 py-6">
// //         {/* 🔥 REPLACE OLD BREADCRUMB WITH ENHANCED BREADCRUMBTRAIL */}
// //         <BreadcrumbTrail propertyData={property} user={user} />

// //         {/* Back Button */}
// //         <div className="mb-6">
// //           <Button
// //             variant="outline"
// //             onClick={handleBackToListings}
// //             iconName="ArrowLeft"
// //             iconPosition="left"
// //           >
// //             Back to Listings
// //           </Button>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Main Content */}
// //           <div className="lg:col-span-2 space-y-8">
// //             <PropertyImageGallery
// //               images={property.images}
// //               propertyTitle={property.title}
// //             />

// //             <div className="lg:hidden">
// //               <PropertyActions
// //                 property={property}
// //                 onScheduleViewing={handleScheduleViewing}
// //                 onWhatsAppContact={handleWhatsAppContact}
// //               />
// //             </div>

// //             {/* Tabs */}
// //             <div className="border-b border-border">
// //               <nav className="flex space-x-8">
// //                 {tabs.map((tab) => (
// //                   <button
// //                     key={tab.id}
// //                     onClick={() => handleTabChange(tab.id)}
// //                     className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
// //                       activeTab === tab.id
// //                         ? "border-primary text-primary"
// //                         : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
// //                     }`}
// //                   >
// //                     <Icon name={tab.icon} size={16} />
// //                     <span>{tab.label}</span>
// //                   </button>
// //                 ))}
// //               </nav>
// //             </div>

// //             {/* Tab Content */}
// //             <div className="min-h-[400px]">{tabContent}</div>
// //           </div>

// //           {/* Sidebar */}
// //           <div className="space-y-6">
// //             <AgentCard
// //               agent={property.agent}
// //               onScheduleViewing={handleScheduleViewing}
// //               onWhatsAppContact={handleWhatsAppContact}
// //               onEmailContact={handleEmailContact}
// //             />

// //             <div className="hidden lg:block">
// //               <PropertyActions
// //                 property={property}
// //                 onScheduleViewing={handleScheduleViewing}
// //                 onWhatsAppContact={handleWhatsAppContact}
// //               />
// //             </div>

// //             {/* Quick Information */}
// //             <div className="bg-card border border-border rounded-lg p-6">
// //               <h4 className="font-semibold text-foreground mb-4">
// //                 Quick Information
// //               </h4>
// //               <div className="space-y-3 text-sm">
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Property ID</span>
// //                   <span className="text-foreground font-medium">
// //                     {formattedPropertyId}
// //                   </span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Listed Date</span>
// //                   <span className="text-foreground">
// //                     {new Date(property.listedDate).toLocaleDateString()}
// //                   </span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Status</span>
// //                   <span className="text-foreground capitalize">
// //                     {property.status}
// //                   </span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Type</span>
// //                   <span className="text-foreground capitalize">
// //                     {property.type}
// //                   </span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Area</span>
// //                   <span className="text-foreground">
// //                     {property.area} {property.areaUnit}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Contact Support */}
// //             <div className="bg-muted/50 rounded-lg p-6 text-center">
// //               <Icon
// //                 name="Headphones"
// //                 size={32}
// //                 className="text-primary mx-auto mb-3"
// //               />
// //               <h4 className="font-semibold text-foreground mb-2">Need Help?</h4>
// //               <p className="text-sm text-muted-foreground mb-4">
// //                 Our support team is here to assist you with any questions.
// //               </p>
// //               <Button variant="outline" size="sm" fullWidth>
// //                 Contact Support
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </main>

// //       <AppointmentModal
// //         isOpen={isAppointmentModalOpen}
// //         onClose={handleCloseAppointmentModal}
// //         property={property}
// //         agent={property.agent}
// //       />

// //       <FloatingChat isOpen={isChatOpen} onToggle={handleToggleChat} />
// //     </div>
// //   );
// // };

// // export default React.memo(PropertyDetails);

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import Header from "../../components/ui/Header";
// import FloatingChat from "../../components/ui/FloatingChat";
// import PropertyImageGallery from "./components/PropertyImageGallery";
// import PropertyInfo from "./components/PropertyInfo";
// import AgentCard from "./components/AgentCard";
// import AppointmentModal from "./components/AppointmentModal";
// import PropertyLocation from "./components/PropertyLocation";
// import SimilarProperties from "./components/SimilarProperties";
// import PropertyActions from "./components/PropertyActions";
// import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
// import Icon from "../../components/AppIcon";
// import Button from "../../components/ui/Button";
// import { getPropertyBySlug } from "../../lib/mongo/services/propertyService";
// import { AlertCircle, Heart } from "lucide-react";

// // 🔥 IMPORT SKELETON COMPONENT
// import PropertyDetailsSkeleton from "../../components/loading/PropertyDetailsSkeleton";

// // 🔥 ADD THESE IMPORTS
// import { usePerformanceMonitor } from "../../hooks/usePerformanceMonitor";
// import { checkPerformanceBudget } from "../../utils/performanceBudget";
// import { trackSEOEvents } from "../../utils/analytics";
// import { optimizeImageUrl } from "../../utils/imageOptimizer";

// // 🔥 IMPORT WISHLIST SERVICES
// import {
//   addToWishlist,
//   removeFromWishlist,
//   checkWishlistStatus,
// } from "../../lib/mongo/services/wishlistService";

// const PropertyDetails = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [user, setUser] = useState(null);

//   // 🔥 WISHLIST STATES
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [wishlistLoading, setWishlistLoading] = useState(false);
//   const [wishlistError, setWishlistError] = useState(null);

//   // 🔥 INITIALIZE PERFORMANCE MONITORING
//   usePerformanceMonitor();

//   // 🔥 ENHANCED SEO META TAGS
//   const getPropertyMetaTags = useCallback(() => {
//     if (!property) return null;

//     const title = `🏠 ${property.title} | ${property.bedrooms}BHK ${
//       property.type
//     } in ${property.location} | ₹${
//       property.price?.toLocaleString("en-IN") || "Price on Request"
//     }`;

//     const description = `✅ Verified ${property.bedrooms}BHK ${
//       property.type
//     } in ${property.location}. ${property.area} sq ft • ${
//       property.bathrooms
//     } Bath • ${property.amenities?.slice(0, 3).join(" • ")}. 📞 Contact ${
//       property.agent?.name
//     } for viewing. Instant booking available.`;

//     const currentUrl = `${window.location.origin}/property/${slug}`;
//     const featuredImage = optimizeImageUrl(
//       property.images?.[0]?.url || "/images/property-og-default.jpg",
//       { width: 1200, quality: 85 }
//     );

//     return (
//       <Helmet>
//         {/* Primary Meta Tags */}
//         <title>{title}</title>
//         <meta name="description" content={description} />
//         <meta
//           name="robots"
//           content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
//         />
//         <meta
//           name="keywords"
//           content={`${property.type}, ${property.location}, real estate, property for sale, ${property.bedrooms} bedroom, ${property.area} sq ft, buy property, rent apartment`}
//         />

//         {/* Canonical URL */}
//         <link rel="canonical" href={currentUrl} />

//         {/* Open Graph / Facebook */}
//         <meta property="og:type" content="real_estate.property" />
//         <meta property="og:url" content={currentUrl} />
//         <meta property="og:title" content={title} />
//         <meta property="og:description" content={description} />
//         <meta property="og:image" content={featuredImage} />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//         <meta
//           property="og:image:alt"
//           content={`Main image of ${property.title}`}
//         />
//         <meta property="og:site_name" content="Premium Real Estate Platform" />
//         <meta property="og:locale" content="en_IN" />
//         <meta property="og:price:amount" content={property.price?.toString()} />
//         <meta property="og:price:currency" content="INR" />
//         <meta
//           property="og:availability"
//           content={property.status === "available" ? "instock" : "out of stock"}
//         />

//         {/* Twitter Cards */}
//         <meta property="twitter:card" content="summary_large_image" />
//         <meta property="twitter:url" content={currentUrl} />
//         <meta property="twitter:title" content={title} />
//         <meta property="twitter:description" content={description} />
//         <meta property="twitter:image" content={featuredImage} />
//         <meta
//           property="twitter:image:alt"
//           content={`Main image of ${property.title}`}
//         />
//         <meta property="twitter:site" content="@RealEstatePlatform" />
//         <meta property="twitter:creator" content="@RealEstatePlatform" />

//         {/* Enhanced Structured Data */}
//         <script type="application/ld+json">
//           {JSON.stringify({
//             "@context": "https://schema.org",
//             "@graph": [
//               {
//                 "@type": "RealEstateListing",
//                 "@id": `${currentUrl}#realestatelisting`,
//                 name: property.title,
//                 description: property.description || description,
//                 url: currentUrl,
//                 image: property.images?.map((img) =>
//                   optimizeImageUrl(img.url, { width: 800, quality: 85 })
//                 ) || [featuredImage],
//                 offers: {
//                   "@type": "Offer",
//                   price: property.price,
//                   priceCurrency: "INR",
//                   availability:
//                     property.status === "available"
//                       ? "https://schema.org/InStock"
//                       : "https://schema.org/OutOfStock",
//                   priceValidUntil: new Date(
//                     Date.now() + 90 * 24 * 60 * 60 * 1000
//                   )
//                     .toISOString()
//                     .split("T")[0],
//                   url: currentUrl,
//                   seller: {
//                     "@type": "RealEstateAgent",
//                     name: property.agent?.name,
//                     telephone: property.agent?.phone,
//                     email: property.agent?.email,
//                   },
//                 },
//                 address: {
//                   "@type": "PostalAddress",
//                   streetAddress: property.address || property.location,
//                   addressLocality:
//                     typeof property.location === "object"
//                       ? property.location.city
//                       : property.location,
//                   addressRegion:
//                     typeof property.location === "object"
//                       ? property.location.state
//                       : "",
//                   postalCode: property.pincode,
//                   addressCountry: "IN",
//                 },
//                 geo: {
//                   "@type": "GeoCoordinates",
//                   latitude: property.coordinates?.lat || 0,
//                   longitude: property.coordinates?.lng || 0,
//                 },
//                 numberOfRooms: property.bedrooms,
//                 numberOfBathroomsTotal: property.bathrooms,
//                 floorSize: {
//                   "@type": "QuantitativeValue",
//                   value: property.area,
//                   unitCode: property.areaUnit === "sqft" ? "FTK" : "MTK",
//                 },
//                 petsAllowed:
//                   property.amenities?.includes("Pet Friendly") || false,
//                 yearBuilt: property.builtYear,
//                 listingDate: property.listedDate,
//                 provider: {
//                   "@type": "RealEstateAgent",
//                   name: property.agent?.name,
//                   telephone: property.agent?.phone,
//                   email: property.agent?.email,
//                   rating: {
//                     "@type": "AggregateRating",
//                     ratingValue: property.agent?.rating || 4.5,
//                     reviewCount: property.agent?.reviewCount || 25,
//                     bestRating: 5,
//                   },
//                 },
//                 amenityFeature: property.amenities?.map((amenity) => ({
//                   "@type": "LocationFeatureSpecification",
//                   name: amenity,
//                   value: true,
//                 })),
//               },
//               {
//                 "@type": "WebPage",
//                 "@id": `${currentUrl}#webpage`,
//                 url: currentUrl,
//                 name: title,
//                 description: description,
//                 isPartOf: {
//                   "@id": `${window.location.origin}/#website`,
//                 },
//                 about: {
//                   "@id": `${currentUrl}#realestatelisting`,
//                 },
//                 datePublished: property.listedDate,
//                 dateModified: new Date().toISOString(),
//                 breadcrumb: {
//                   "@id": `${currentUrl}#breadcrumb`,
//                 },
//                 primaryImageOfPage: {
//                   "@type": "ImageObject",
//                   url: featuredImage,
//                   width: 1200,
//                   height: 630,
//                 },
//                 potentialAction: [
//                   {
//                     "@type": "ReadAction",
//                     target: [currentUrl],
//                   },
//                 ],
//               },
//               {
//                 "@type": "Organization",
//                 "@id": `${window.location.origin}/#organization`,
//                 name: "Premium Real Estate Platform",
//                 url: window.location.origin,
//                 logo: `${window.location.origin}/logo.png`,
//                 description:
//                   "India's leading real estate platform for buying, selling, and renting properties",
//                 address: {
//                   "@type": "PostalAddress",
//                   addressLocality: "Mumbai",
//                   addressRegion: "Maharashtra",
//                   addressCountry: "IN",
//                 },
//                 contactPoint: {
//                   "@type": "ContactPoint",
//                   telephone: "+91-XXXXXXXXXX",
//                   contactType: "customer service",
//                   areaServed: "IN",
//                   availableLanguage: ["English", "Hindi"],
//                 },
//                 sameAs: [
//                   "https://www.facebook.com/realestateplatform",
//                   "https://www.twitter.com/realestateplatform",
//                   "https://www.linkedin.com/company/realestateplatform",
//                 ],
//               },
//             ],
//           })}
//         </script>
//       </Helmet>
//     );
//   }, [property, slug]);

//   const transformPropertyData = useCallback((apiData) => {
//     if (!apiData) return null;

//     // Determine which agent data to use
//     let agentData = {};

//     if (
//       apiData.agentInfo &&
//       apiData.agentInfo.name &&
//       apiData.agentInfo.name !== "Agent"
//     ) {
//       agentData = {
//         id: apiData.agentInfo?._id || apiData._id,
//         name: apiData.agentInfo.name,
//         designation: apiData.agentInfo.designation,
//         avatar: apiData.agentInfo.avatar,
//         phone: apiData.agentInfo.phone,
//         email: apiData.agentInfo.email,
//         rating: apiData.agentInfo.rating,
//         reviewCount: apiData.agentInfo.reviewCount,
//         propertiesSold: apiData.agentInfo.propertiesSold,
//         experience: apiData.agentInfo.experience,
//         languages: apiData.agentInfo.languages,
//       };
//     } else if (apiData.postedBy && typeof apiData.postedBy === "object") {
//       agentData = {
//         id: apiData.postedBy._id,
//         name: apiData.postedBy.name,
//         designation: apiData.postedBy.designation,
//         avatar: apiData.postedBy.avatar,
//         phone: apiData.postedBy.phone,
//         email: apiData.postedBy.email,
//         rating: apiData.postedBy.rating?.average || 0,
//         reviewCount: apiData.postedBy.rating?.totalReviews || 0,
//         propertiesSold: apiData.postedBy.performance?.totalPropertiesSold || 0,
//         experience: apiData.postedBy.experience
//           ? `${apiData.postedBy.experience}+`
//           : "0+",
//         languages: apiData.postedBy.languages || ["English", "Hindi"],
//       };
//     } else {
//       agentData = {
//         id: apiData._id,
//         name: "Agent",
//         designation: "Property Consultant",
//         avatar: "default-avatar.jpg",
//         phone: "+919876543210",
//         email: "agent@example.com",
//         rating: 0,
//         reviewCount: 0,
//         propertiesSold: 0,
//         experience: "0+",
//         languages: ["English", "Hindi"],
//       };
//     }

//     return {
//       // Basic info
//       id: apiData._id,
//       title: apiData.title,
//       description: apiData.description,
//       price: apiData.price,
//       originalPrice: apiData.originalPrice,

//       // Location
//       location:
//         typeof apiData.location === "string"
//           ? apiData.location
//           : apiData.location?.address ||
//             `${apiData.location?.city}, ${apiData.location?.state}`,
//       address:
//         typeof apiData.location === "string"
//           ? apiData.location
//           : apiData.location?.address,
//       pincode:
//         typeof apiData.location === "string" ? "" : apiData.location?.pincode,
//       coordinates:
//         typeof apiData.location === "string"
//           ? { lat: 0, lng: 0 }
//           : apiData.location?.coordinates || { lat: 0, lng: 0 },

//       // Status
//       status: apiData.status,
//       featured: apiData.featured,

//       // Specifications
//       bedrooms: apiData.specifications?.bedrooms,
//       bathrooms: apiData.specifications?.bathrooms,
//       area: apiData.specifications?.area,
//       areaUnit: apiData.specifications?.areaUnit || "sqft",
//       type: apiData.specifications?.type,
//       builtYear: apiData.specifications?.builtYear,
//       parking: apiData.specifications?.parking,

//       // Arrays
//       amenities: apiData.amenities || [],
//       features: apiData.features || [],
//       // 🔥 ENHANCED: Optimized images
//       images:
//         apiData.images?.map((img) => ({
//           ...img,
//           url: optimizeImageUrl(img.url, { width: 1200, quality: 85 }),
//         })) || [],

//       // Agent data
//       agent: {
//         ...agentData,
//         avatarAlt: `Professional photo of ${agentData.name}`,
//         location:
//           agentData.location ||
//           (typeof apiData.location === "string"
//             ? apiData.location
//             : `${apiData.location?.city}, ${apiData.location?.state}`),
//       },

//       // Additional fields
//       listedDate: apiData.listedDate || new Date().toISOString(),
//       propertyId: apiData.propertyId || `RC${apiData._id?.slice(-6)}`,
//     };
//   }, []);

//   // 🔥 CHECK WISHLIST STATUS
//   const checkWishlistStatusForProperty = useCallback(async (propertyId) => {
//     if (!propertyId) return;

//     try {
//       setWishlistLoading(true);
//       const response = await checkWishlistStatus(propertyId);
//       setIsWishlisted(response.isWishlisted || false);
//       setWishlistError(null);
//     } catch (err) {
//       console.error("Error checking wishlist status:", err);
//       setWishlistError("Failed to check wishlist status");
//       setIsWishlisted(false);
//     } finally {
//       setWishlistLoading(false);
//     }
//   }, []);

//   // 🔥 TOGGLE WISHLIST FUNCTION
//   const toggleWishlist = useCallback(async () => {
//     if (!property?.id || !user) {
//       // Redirect to login if user is not authenticated
//       navigate("/login", {
//         state: {
//           from: `/property/${slug}`,
//           message: "Please login to add properties to your wishlist",
//         },
//       });
//       return;
//     }

//     try {
//       setWishlistLoading(true);
//       setWishlistError(null);

//       if (isWishlisted) {
//         // Remove from wishlist
//         await removeFromWishlist(property.id);
//         setIsWishlisted(false);
//         trackSEOEvents.wishlistAction(property, "remove");
//       } else {
//         // Add to wishlist
//         await addToWishlist(property.id);
//         setIsWishlisted(true);
//         trackSEOEvents.wishlistAction(property, "add");
//       }
//     } catch (err) {
//       console.error("Error toggling wishlist:", err);
//       setWishlistError(
//         err.message ||
//           `Failed to ${isWishlisted ? "remove from" : "add to"} wishlist`
//       );
//     } finally {
//       setWishlistLoading(false);
//     }
//   }, [property, isWishlisted, user, slug, navigate]);

//   const tabs = useMemo(
//     () => [
//       { id: "overview", label: "Overview", icon: "Home" },
//       { id: "location", label: "Location", icon: "MapPin" },
//       { id: "similar", label: "Similar Properties", icon: "Building2" },
//     ],
//     []
//   );

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         setLoading(true);

//         if (!slug) {
//           setError("No property slug found in URL");
//           setLoading(false);
//           return;
//         }

//         const res = await getPropertyBySlug(slug);
//         console.log("API response for property:", res);
//         const transformedProperty = transformPropertyData(res.property);
//         setProperty(transformedProperty);
//       } catch (err) {
//         console.error("Error fetching property:", err);
//         setError(err.message || "Failed to load property details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperty();

//     // Mock user data - In real app, you'd get this from context or auth service
//     setUser({
//       id: "user123",
//       name: "John Doe",
//       email: "john.doe@example.com",
//       role: "buyer",
//     });
//   }, [slug, transformPropertyData]);

//   // 🔥 CHECK WISHLIST STATUS WHEN PROPERTY LOADS
//   useEffect(() => {
//     if (property?.id && user) {
//       checkWishlistStatusForProperty(property.id);
//     }
//   }, [property, user, checkWishlistStatusForProperty]);

//   // 🔥 ADD TRACKING TO EFFECT
//   useEffect(() => {
//     if (property) {
//       trackSEOEvents.propertyView(property);

//       // Check performance after page loads
//       setTimeout(() => {
//         checkPerformanceBudget();
//       }, 2000);
//     }
//   }, [property]);

//   const handleScheduleViewing = useCallback(
//     () => setIsAppointmentModalOpen(true),
//     []
//   );
//   const handleCloseAppointmentModal = useCallback(
//     () => setIsAppointmentModalOpen(false),
//     []
//   );
//   const handleToggleChat = useCallback(
//     () => setIsChatOpen((prev) => !prev),
//     []
//   );
//   const handleTabChange = useCallback((tabId) => setActiveTab(tabId), []);
//   const handleBackToListings = useCallback(
//     () => navigate("/property-listings"),
//     [navigate]
//   );
//   const handleHomeNavigate = useCallback(
//     () => navigate("/home-page"),
//     [navigate]
//   );

//   // 🔥 ENHANCED CONTACT HANDLERS WITH TRACKING
//   const handleWhatsAppContact = useCallback(() => {
//     if (!property?.agent?.phone) return;

//     trackSEOEvents.contactAction(property, "whatsapp");

//     const message = encodeURIComponent(
//       `Hi ${property.agent.name}, I'm interested in the property: ${property.title}. Can we schedule a viewing?`
//     );
//     const phoneNumber = property.agent.phone.replace(/\D/g, "");
//     window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
//   }, [property]);

//   const handleEmailContact = useCallback(() => {
//     if (!property?.agent?.email) return;

//     trackSEOEvents.contactAction(property, "email");

//     const subject = encodeURIComponent(
//       `Interest in Property: ${property.title}`
//     );
//     const body = encodeURIComponent(
//       `Hi ${property.agent.name},\n\nI'm interested in the property: ${property.title}.\n\nCan you please provide more details and available viewing schedules?\n\nThank you!`
//     );

//     window.open(
//       `mailto:${property.agent.email}?subject=${subject}&body=${body}`,
//       "_blank"
//     );
//   }, [property]);

//   const formattedPropertyId = useMemo(
//     () => property?.propertyId || "",
//     [property]
//   );

//   const tabContent = useMemo(() => {
//     switch (activeTab) {
//       case "overview":
//         return <PropertyInfo property={property} />;
//       case "location":
//         return <PropertyLocation property={property} />;
//       case "similar":
//         return <SimilarProperties currentProperty={property} />;
//       default:
//         return <PropertyInfo property={property} />;
//     }
//   }, [activeTab, property]);

//   // 🔥 WISHLIST BUTTON COMPONENT
//   const WishlistButton = useMemo(
//     () => (
//       <Button
//         variant={isWishlisted ? "primary" : "outline"}
//         size="sm"
//         onClick={toggleWishlist}
//         disabled={wishlistLoading}
//         iconName={isWishlisted ? "Heart" : "Heart"}
//         iconPosition="left"
//         className={`transition-smooth ${
//           isWishlisted
//             ? "bg-red-500 hover:bg-red-600 border-red-500 text-white"
//             : "border-border hover:border-red-300 hover:text-red-500"
//         } ${wishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//       >
//         {wishlistLoading
//           ? "Loading..."
//           : isWishlisted
//           ? "Saved to Wishlist"
//           : "Add to Wishlist"}
//       </Button>
//     ),
//     [isWishlisted, wishlistLoading, toggleWishlist]
//   );

//   // 🔥 SKELETON LOADING
//   if (loading) {
//     return <PropertyDetailsSkeleton />;
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center p-6">
//         <Helmet>
//           <title>Property Not Found | Premium Real Estate Platform</title>
//           <meta
//             name="description"
//             content="The requested property could not be found."
//           />
//         </Helmet>
//         <div className="text-center max-w-md">
//           <div className="flex justify-center mb-6">
//             <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
//               <AlertCircle className="w-8 h-8 text-red-500" />
//             </div>
//           </div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-3">
//             Something went wrong
//           </h2>
//           <p className="text-red-500 font-medium mb-2">{error}</p>
//           <p className="text-gray-600 text-sm mb-6">
//             We encountered an issue while loading this page.
//           </p>
//           <Button
//             onClick={handleBackToListings}
//             variant="primary"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
//           >
//             Back to Property Listings
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Helmet>
//           <title>Property Not Found | Premium Real Estate Platform</title>
//           <meta
//             name="description"
//             content="The requested property could not be found."
//           />
//         </Helmet>
//         <div className="text-center">
//           <p className="text-muted-foreground mb-4">No property found.</p>
//           <Button onClick={handleBackToListings}>
//             Back to Property Listings
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* 🔥 SEO Meta Tags */}
//       {getPropertyMetaTags()}

//       <Header
//         user={user}
//         onLogout={() => navigate("/login")}
//         onSearch={() => {}}
//       />

//       <main className="container mx-auto px-4 py-6">
//         {/* 🔥 REPLACE OLD BREADCRUMB WITH ENHANCED BREADCRUMBTRAIL */}
//         <BreadcrumbTrail propertyData={property} user={user} />

//         {/* Back Button */}
//         <div className="mb-6">
//           <Button
//             variant="outline"
//             onClick={handleBackToListings}
//             iconName="ArrowLeft"
//             iconPosition="left"
//           >
//             Back to Listings
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             <PropertyImageGallery
//               images={property.images}
//               propertyTitle={property.title}
//               // 🔥 ADD WISHLIST BUTTON TO GALLERY
//               wishlistButton={WishlistButton}
//               isWishlisted={isWishlisted}
//               onWishlistToggle={toggleWishlist}
//               wishlistLoading={wishlistLoading}
//             />

//             <div className="lg:hidden">
//               <PropertyActions
//                 property={property}
//                 onScheduleViewing={handleScheduleViewing}
//                 onWhatsAppContact={handleWhatsAppContact}
//                 // 🔥 PASS WISHLIST PROPS
//                 isWishlisted={isWishlisted}
//                 onWishlistToggle={toggleWishlist}
//                 wishlistLoading={wishlistLoading}
//               />
//             </div>

//             {/* Tabs */}
//             <div className="border-b border-border">
//               <nav className="flex space-x-8">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => handleTabChange(tab.id)}
//                     className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
//                       activeTab === tab.id
//                         ? "border-primary text-primary"
//                         : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
//                     }`}
//                   >
//                     <Icon name={tab.icon} size={16} />
//                     <span>{tab.label}</span>
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             {/* Tab Content */}
//             <div className="min-h-[400px]">{tabContent}</div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             <AgentCard
//               agent={property.agent}
//               onScheduleViewing={handleScheduleViewing}
//               onWhatsAppContact={handleWhatsAppContact}
//               onEmailContact={handleEmailContact}
//             />

//             <div className="hidden lg:block">
//               <PropertyActions
//                 property={property}
//                 onScheduleViewing={handleScheduleViewing}
//                 onWhatsAppContact={handleWhatsAppContact}
//                 // 🔥 PASS WISHLIST PROPS
//                 isWishlisted={isWishlisted}
//                 onWishlistToggle={toggleWishlist}
//                 wishlistLoading={wishlistLoading}
//               />
//             </div>

//             {/* Quick Information */}
//             <div className="bg-card border border-border rounded-lg p-6">
//               <h4 className="font-semibold text-foreground mb-4">
//                 Quick Information
//               </h4>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Property ID</span>
//                   <span className="text-foreground font-medium">
//                     {formattedPropertyId}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Listed Date</span>
//                   <span className="text-foreground">
//                     {new Date(property.listedDate).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Status</span>
//                   <span className="text-foreground capitalize">
//                     {property.status}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Type</span>
//                   <span className="text-foreground capitalize">
//                     {property.type}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Area</span>
//                   <span className="text-foreground">
//                     {property.area} {property.areaUnit}
//                   </span>
//                 </div>
//                 {/* 🔥 ADD WISHLIST STATUS */}
//                 <div className="flex justify-between items-center pt-2 border-t border-border">
//                   <span className="text-muted-foreground">Wishlist Status</span>
//                   <div className="flex items-center space-x-1">
//                     <Heart
//                       size={16}
//                       className={
//                         isWishlisted
//                           ? "text-red-500 fill-red-500"
//                           : "text-gray-400"
//                       }
//                     />
//                     <span
//                       className={`text-sm font-medium ${
//                         isWishlisted ? "text-red-500" : "text-foreground"
//                       }`}
//                     >
//                       {isWishlisted ? "Saved" : "Not Saved"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 🔥 WISHLIST ERROR MESSAGE */}
//             {wishlistError && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <div className="flex items-center space-x-2 text-red-700">
//                   <AlertCircle size={16} />
//                   <span className="text-sm font-medium">{wishlistError}</span>
//                 </div>
//               </div>
//             )}

//             {/* Contact Support */}
//             <div className="bg-muted/50 rounded-lg p-6 text-center">
//               <Icon
//                 name="Headphones"
//                 size={32}
//                 className="text-primary mx-auto mb-3"
//               />
//               <h4 className="font-semibold text-foreground mb-2">Need Help?</h4>
//               <p className="text-sm text-muted-foreground mb-4">
//                 Our support team is here to assist you with any questions.
//               </p>
//               <Button variant="outline" size="sm" fullWidth>
//                 Contact Support
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <AppointmentModal
//         isOpen={isAppointmentModalOpen}
//         onClose={handleCloseAppointmentModal}
//         property={property}
//         agent={property.agent}
//       />

//       <FloatingChat isOpen={isChatOpen} onToggle={handleToggleChat} />
//     </div>
//   );
// };

// export default React.memo(PropertyDetails);

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import FloatingChat from "../../components/ui/FloatingChat";
import PropertyImageGallery from "./components/PropertyImageGallery";
import PropertyInfo from "./components/PropertyInfo";
import AgentCard from "./components/AgentCard";
import AppointmentModal from "./components/AppointmentModal";
import PropertyLocation from "./components/PropertyLocation";
import SimilarProperties from "./components/SimilarProperties";
import PropertyActions from "./components/PropertyActions";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { getPropertyBySlug } from "../../lib/mongo/services/propertyService";
import { AlertCircle, Heart } from "lucide-react";

// 🔥 IMPORT SKELETON COMPONENT
import PropertyDetailsSkeleton from "../../components/loading/PropertyDetailsSkeleton";

// 🔥 ADD THESE IMPORTS
import { usePerformanceMonitor } from "../../hooks/usePerformanceMonitor";
import { checkPerformanceBudget } from "../../utils/performanceBudget";
import { trackSEOEvents } from "../../utils/analytics";
import { optimizeImageUrl } from "../../utils/imageOptimizer";

// 🔥 IMPORT WISHLIST SERVICES
import {
  addToWishlist,
  removeFromWishlist,
  checkWishlistStatus,
} from "../../lib/mongo/services/wishlistService";

const PropertyDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);

  // 🔥 WISHLIST STATES
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState(null);

  // 🔥 INITIALIZE PERFORMANCE MONITORING
  usePerformanceMonitor();

  // 🔥 GET USER FROM LOCALSTORAGE
  const getUserFromStorage = useCallback(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
    return null;
  }, []);

  // 🔥 CHECK AUTHENTICATION STATUS
  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem("token");
    return !!token;
  }, []);

  // 🔥 ENHANCED SEO META TAGS
  const getPropertyMetaTags = useCallback(() => {
    if (!property) return null;

    const title = `🏠 ${property.title} | ${property.bedrooms}BHK ${
      property.type
    } in ${property.location} | ₹${
      property.price?.toLocaleString("en-IN") || "Price on Request"
    }`;

    const description = `✅ Verified ${property.bedrooms}BHK ${
      property.type
    } in ${property.location}. ${property.area} sq ft • ${
      property.bathrooms
    } Bath • ${property.amenities?.slice(0, 3).join(" • ")}. 📞 Contact ${
      property.agent?.name
    } for viewing. Instant booking available.`;

    const currentUrl = `${window.location.origin}/property/${slug}`;
    const featuredImage = optimizeImageUrl(
      property.images?.[0]?.url || "/images/property-og-default.jpg",
      { width: 1200, quality: 85 }
    );

    return (
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="keywords"
          content={`${property.type}, ${property.location}, real estate, property for sale, ${property.bedrooms} bedroom, ${property.area} sq ft, buy property, rent apartment`}
        />

        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="real_estate.property" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content={`Main image of ${property.title}`}
        />
        <meta property="og:site_name" content="Premium Real Estate Platform" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:price:amount" content={property.price?.toString()} />
        <meta property="og:price:currency" content="INR" />
        <meta
          property="og:availability"
          content={property.status === "available" ? "instock" : "out of stock"}
        />

        {/* Twitter Cards */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={featuredImage} />
        <meta
          property="twitter:image:alt"
          content={`Main image of ${property.title}`}
        />
        <meta property="twitter:site" content="@RealEstatePlatform" />
        <meta property="twitter:creator" content="@RealEstatePlatform" />

        {/* Enhanced Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "RealEstateListing",
                "@id": `${currentUrl}#realestatelisting`,
                name: property.title,
                description: property.description || description,
                url: currentUrl,
                image: property.images?.map((img) =>
                  optimizeImageUrl(img.url, { width: 800, quality: 85 })
                ) || [featuredImage],
                offers: {
                  "@type": "Offer",
                  price: property.price,
                  priceCurrency: "INR",
                  availability:
                    property.status === "available"
                      ? "https://schema.org/InStock"
                      : "https://schema.org/OutOfStock",
                  priceValidUntil: new Date(
                    Date.now() + 90 * 24 * 60 * 60 * 1000
                  )
                    .toISOString()
                    .split("T")[0],
                  url: currentUrl,
                  seller: {
                    "@type": "RealEstateAgent",
                    name: property.agent?.name,
                    telephone: property.agent?.phone,
                    email: property.agent?.email,
                  },
                },
                address: {
                  "@type": "PostalAddress",
                  streetAddress: property.address || property.location,
                  addressLocality:
                    typeof property.location === "object"
                      ? property.location.city
                      : property.location,
                  addressRegion:
                    typeof property.location === "object"
                      ? property.location.state
                      : "",
                  postalCode: property.pincode,
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: property.coordinates?.lat || 0,
                  longitude: property.coordinates?.lng || 0,
                },
                numberOfRooms: property.bedrooms,
                numberOfBathroomsTotal: property.bathrooms,
                floorSize: {
                  "@type": "QuantitativeValue",
                  value: property.area,
                  unitCode: property.areaUnit === "sqft" ? "FTK" : "MTK",
                },
                petsAllowed:
                  property.amenities?.includes("Pet Friendly") || false,
                yearBuilt: property.builtYear,
                listingDate: property.listedDate,
                provider: {
                  "@type": "RealEstateAgent",
                  name: property.agent?.name,
                  telephone: property.agent?.phone,
                  email: property.agent?.email,
                  rating: {
                    "@type": "AggregateRating",
                    ratingValue: property.agent?.rating || 4.5,
                    reviewCount: property.agent?.reviewCount || 25,
                    bestRating: 5,
                  },
                },
                amenityFeature: property.amenities?.map((amenity) => ({
                  "@type": "LocationFeatureSpecification",
                  name: amenity,
                  value: true,
                })),
              },
              {
                "@type": "WebPage",
                "@id": `${currentUrl}#webpage`,
                url: currentUrl,
                name: title,
                description: description,
                isPartOf: {
                  "@id": `${window.location.origin}/#website`,
                },
                about: {
                  "@id": `${currentUrl}#realestatelisting`,
                },
                datePublished: property.listedDate,
                dateModified: new Date().toISOString(),
                breadcrumb: {
                  "@id": `${currentUrl}#breadcrumb`,
                },
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: featuredImage,
                  width: 1200,
                  height: 630,
                },
                potentialAction: [
                  {
                    "@type": "ReadAction",
                    target: [currentUrl],
                  },
                ],
              },
              {
                "@type": "Organization",
                "@id": `${window.location.origin}/#organization`,
                name: "Premium Real Estate Platform",
                url: window.location.origin,
                logo: `${window.location.origin}/logo.png`,
                description:
                  "India's leading real estate platform for buying, selling, and renting properties",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Mumbai",
                  addressRegion: "Maharashtra",
                  addressCountry: "IN",
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+91-XXXXXXXXXX",
                  contactType: "customer service",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"],
                },
                sameAs: [
                  "https://www.facebook.com/realestateplatform",
                  "https://www.twitter.com/realestateplatform",
                  "https://www.linkedin.com/company/realestateplatform",
                ],
              },
            ],
          })}
        </script>
      </Helmet>
    );
  }, [property, slug]);

  const transformPropertyData = useCallback((apiData) => {
    if (!apiData) return null;

    // Determine which agent data to use
    let agentData = {};

    if (
      apiData.agentInfo &&
      apiData.agentInfo.name &&
      apiData.agentInfo.name !== "Agent"
    ) {
      agentData = {
        id: apiData.agentInfo?._id || apiData._id,
        name: apiData.agentInfo.name,
        designation: apiData.agentInfo.designation,
        avatar: apiData.agentInfo.avatar,
        phone: apiData.agentInfo.phone,
        email: apiData.agentInfo.email,
        rating: apiData.agentInfo.rating,
        reviewCount: apiData.agentInfo.reviewCount,
        propertiesSold: apiData.agentInfo.propertiesSold,
        experience: apiData.agentInfo.experience,
        languages: apiData.agentInfo.languages,
      };
    } else if (apiData.postedBy && typeof apiData.postedBy === "object") {
      agentData = {
        id: apiData.postedBy._id,
        name: apiData.postedBy.name,
        designation: apiData.postedBy.designation,
        avatar: apiData.postedBy.avatar,
        phone: apiData.postedBy.phone,
        email: apiData.postedBy.email,
        rating: apiData.postedBy.rating?.average || 0,
        reviewCount: apiData.postedBy.rating?.totalReviews || 0,
        propertiesSold: apiData.postedBy.performance?.totalPropertiesSold || 0,
        experience: apiData.postedBy.experience
          ? `${apiData.postedBy.experience}+`
          : "0+",
        languages: apiData.postedBy.languages || ["English", "Hindi"],
      };
    } else {
      agentData = {
        id: apiData._id,
        name: "Agent",
        designation: "Property Consultant",
        avatar: "default-avatar.jpg",
        phone: "+919876543210",
        email: "agent@example.com",
        rating: 0,
        reviewCount: 0,
        propertiesSold: 0,
        experience: "0+",
        languages: ["English", "Hindi"],
      };
    }

    return {
      // Basic info
      id: apiData._id,
      title: apiData.title,
      description: apiData.description,
      price: apiData.price,
      originalPrice: apiData.originalPrice,

      // Location
      location:
        typeof apiData.location === "string"
          ? apiData.location
          : apiData.location?.address ||
            `${apiData.location?.city}, ${apiData.location?.state}`,
      address:
        typeof apiData.location === "string"
          ? apiData.location
          : apiData.location?.address,
      pincode:
        typeof apiData.location === "string" ? "" : apiData.location?.pincode,
      coordinates:
        typeof apiData.location === "string"
          ? { lat: 0, lng: 0 }
          : apiData.location?.coordinates || { lat: 0, lng: 0 },

      // Status
      status: apiData.status,
      featured: apiData.featured,

      // Specifications
      bedrooms: apiData.specifications?.bedrooms,
      bathrooms: apiData.specifications?.bathrooms,
      area: apiData.specifications?.area,
      areaUnit: apiData.specifications?.areaUnit || "sqft",
      type: apiData.specifications?.type,
      builtYear: apiData.specifications?.builtYear,
      parking: apiData.specifications?.parking,

      // Arrays
      amenities: apiData.amenities || [],
      features: apiData.features || [],
      // 🔥 ENHANCED: Optimized images
      images:
        apiData.images?.map((img) => ({
          ...img,
          url: optimizeImageUrl(img.url, { width: 1200, quality: 85 }),
        })) || [],

      // Agent data
      agent: {
        ...agentData,
        avatarAlt: `Professional photo of ${agentData.name}`,
        location:
          agentData.location ||
          (typeof apiData.location === "string"
            ? apiData.location
            : `${apiData.location?.city}, ${apiData.location?.state}`),
      },

      // Additional fields
      listedDate: apiData.listedDate || new Date().toISOString(),
      propertyId: apiData.propertyId || `RC${apiData._id?.slice(-6)}`,
    };
  }, []);

  // 🔥 CHECK WISHLIST STATUS WITH AUTH HANDLING
  const checkWishlistStatusForProperty = useCallback(
    async (propertyId) => {
      if (!propertyId) return;

      // 🔥 CHECK IF USER IS AUTHENTICATED FIRST
      if (!isAuthenticated()) {
        console.log("User not authenticated, skipping wishlist status check");
        setIsWishlisted(false);
        return;
      }

      try {
        setWishlistLoading(true);
        const response = await checkWishlistStatus(propertyId);
        // 🔥 FIX: Use response.inWishlist instead of response.isWishlisted
        setIsWishlisted(response.inWishlist || false);
        setWishlistError(null);
      } catch (err) {
        console.error("Error checking wishlist status:", err);
        // 🔥 HANDLE UNAUTHORIZED ERRORS GRACEFULLY
        if (
          err.message?.includes("log in") ||
          err.message?.includes("unauthorized") ||
          err.response?.status === 401
        ) {
          console.log("User not authenticated for wishlist features");
          setIsWishlisted(false);
        } else {
          setWishlistError("Failed to check wishlist status");
        }
      } finally {
        setWishlistLoading(false);
      }
    },
    [isAuthenticated]
  );

  // 🔥 TOGGLE WISHLIST FUNCTION WITH AUTH HANDLING
  const toggleWishlist = useCallback(async () => {
    if (!property?.id) return;

    // 🔥 CHECK AUTHENTICATION FIRST
    if (!isAuthenticated()) {
      navigate("/login", {
        state: {
          from: `/property/${slug}`,
          message: "Please login to add properties to your wishlist",
        },
      });
      return;
    }

    try {
      setWishlistLoading(true);
      setWishlistError(null);

      if (isWishlisted) {
        // Remove from wishlist
        await removeFromWishlist(property.id);
        setIsWishlisted(false);
        trackSEOEvents.wishlistAction(property, "remove");
      } else {
        // Add to wishlist
        await addToWishlist(property.id);
        setIsWishlisted(true);
        trackSEOEvents.wishlistAction(property, "add");
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);

      // 🔥 HANDLE SPECIFIC ERROR CASES
      if (err.message?.includes("already in wishlist")) {
        setIsWishlisted(true); // Sync state
      } else if (err.message?.includes("not found in wishlist")) {
        setIsWishlisted(false); // Sync state
      } else if (
        err.message?.includes("log in") ||
        err.message?.includes("unauthorized")
      ) {
        setWishlistError("Please login to use wishlist features");
        // Redirect to login
        navigate("/login", {
          state: {
            from: `/property/${slug}`,
            message: "Your session has expired. Please login again.",
          },
        });
      } else {
        setWishlistError(
          err.message ||
            `Failed to ${isWishlisted ? "remove from" : "add to"} wishlist`
        );
      }
    } finally {
      setWishlistLoading(false);
    }
  }, [property, isWishlisted, isAuthenticated, slug, navigate]);

  const tabs = useMemo(
    () => [
      { id: "overview", label: "Overview", icon: "Home" },
      { id: "location", label: "Location", icon: "MapPin" },
      { id: "similar", label: "Similar Properties", icon: "Building2" },
    ],
    []
  );

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        if (!slug) {
          setError("No property slug found in URL");
          setLoading(false);
          return;
        }

        const res = await getPropertyBySlug(slug);
        console.log("API response for property:", res);
        const transformedProperty = transformPropertyData(res.property);
        setProperty(transformedProperty);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(err.message || "Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();

    // 🔥 SET USER FROM LOCALSTORAGE
    const currentUser = getUserFromStorage();
    setUser(currentUser);
  }, [slug, transformPropertyData, getUserFromStorage]);

  // 🔥 CHECK WISHLIST STATUS WHEN PROPERTY LOADS
  useEffect(() => {
    if (property?.id) {
      checkWishlistStatusForProperty(property.id);
    }
  }, [property, checkWishlistStatusForProperty]);

  // 🔥 ADD TRACKING TO EFFECT
  useEffect(() => {
    if (property) {
      trackSEOEvents.propertyView(property);

      // Check performance after page loads
      setTimeout(() => {
        checkPerformanceBudget();
      }, 2000);
    }
  }, [property]);

  const handleScheduleViewing = useCallback(
    () => setIsAppointmentModalOpen(true),
    []
  );
  const handleCloseAppointmentModal = useCallback(
    () => setIsAppointmentModalOpen(false),
    []
  );
  const handleToggleChat = useCallback(
    () => setIsChatOpen((prev) => !prev),
    []
  );
  const handleTabChange = useCallback((tabId) => setActiveTab(tabId), []);
  const handleBackToListings = useCallback(
    () => navigate("/property-listings"),
    [navigate]
  );
  const handleHomeNavigate = useCallback(
    () => navigate("/home-page"),
    [navigate]
  );

  // 🔥 ENHANCED CONTACT HANDLERS WITH TRACKING
  const handleWhatsAppContact = useCallback(() => {
    if (!property?.agent?.phone) return;

    trackSEOEvents.contactAction(property, "whatsapp");

    const message = encodeURIComponent(
      `Hi ${property.agent.name}, I'm interested in the property: ${property.title}. Can we schedule a viewing?`
    );
    const phoneNumber = property.agent.phone.replace(/\D/g, "");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  }, [property]);

  const handleEmailContact = useCallback(() => {
    if (!property?.agent?.email) return;

    trackSEOEvents.contactAction(property, "email");

    const subject = encodeURIComponent(
      `Interest in Property: ${property.title}`
    );
    const body = encodeURIComponent(
      `Hi ${property.agent.name},\n\nI'm interested in the property: ${property.title}.\n\nCan you please provide more details and available viewing schedules?\n\nThank you!`
    );

    window.open(
      `mailto:${property.agent.email}?subject=${subject}&body=${body}`,
      "_blank"
    );
  }, [property]);

  const formattedPropertyId = useMemo(
    () => property?.propertyId || "",
    [property]
  );

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "overview":
        return <PropertyInfo property={property} />;
      case "location":
        return <PropertyLocation property={property} />;
      case "similar":
        return <SimilarProperties currentProperty={property} />;
      default:
        return <PropertyInfo property={property} />;
    }
  }, [activeTab, property]);

  // 🔥 WISHLIST BUTTON COMPONENT
  const WishlistButton = useMemo(
    () => (
      <Button
        variant={isWishlisted ? "primary" : "outline"}
        size="sm"
        onClick={toggleWishlist}
        disabled={wishlistLoading}
        iconName="Heart"
        iconPosition="left"
        className={`transition-smooth ${
          isWishlisted
            ? "bg-red-500 hover:bg-red-600 border-red-500 text-white"
            : "border-border hover:border-red-300 hover:text-red-500"
        } ${wishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {wishlistLoading
          ? "Loading..."
          : isWishlisted
          ? "Saved to Wishlist"
          : "Add to Wishlist"}
      </Button>
    ),
    [isWishlisted, wishlistLoading, toggleWishlist]
  );

  // 🔥 SKELETON LOADING
  if (loading) {
    return <PropertyDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Helmet>
          <title>Property Not Found | Premium Real Estate Platform</title>
          <meta
            name="description"
            content="The requested property could not be found."
          />
        </Helmet>
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Something went wrong
          </h2>
          <p className="text-red-500 font-medium mb-2">{error}</p>
          <p className="text-gray-600 text-sm mb-6">
            We encountered an issue while loading this page.
          </p>
          <Button
            onClick={handleBackToListings}
            variant="primary"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
          >
            Back to Property Listings
          </Button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Helmet>
          <title>Property Not Found | Premium Real Estate Platform</title>
          <meta
            name="description"
            content="The requested property could not be found."
          />
        </Helmet>
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No property found.</p>
          <Button onClick={handleBackToListings}>
            Back to Property Listings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 🔥 SEO Meta Tags */}
      {getPropertyMetaTags()}

      <Header
        user={user}
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }}
        onSearch={() => {}}
      />

      <main className="container mx-auto px-4 py-6">
        {/* 🔥 REPLACE OLD BREADCRUMB WITH ENHANCED BREADCRUMBTRAIL */}
        <BreadcrumbTrail propertyData={property} user={user} />

        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={handleBackToListings}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Listings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PropertyImageGallery
              images={property.images}
              propertyTitle={property.title}
              // 🔥 ADD WISHLIST BUTTON TO GALLERY
              wishlistButton={WishlistButton}
              isWishlisted={isWishlisted}
              onWishlistToggle={toggleWishlist}
              wishlistLoading={wishlistLoading}
            />

            <div className="lg:hidden">
              <PropertyActions
                property={property}
                onScheduleViewing={handleScheduleViewing}
                onWhatsAppContact={handleWhatsAppContact}
                // 🔥 PASS WISHLIST PROPS
                isWishlisted={isWishlisted}
                onWishlistToggle={toggleWishlist}
                wishlistLoading={wishlistLoading}
              />
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">{tabContent}</div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AgentCard
              agent={property.agent}
              onScheduleViewing={handleScheduleViewing}
              onWhatsAppContact={handleWhatsAppContact}
              onEmailContact={handleEmailContact}
            />

            <div className="hidden lg:block">
              <PropertyActions
                property={property}
                onScheduleViewing={handleScheduleViewing}
                onWhatsAppContact={handleWhatsAppContact}
                // 🔥 PASS WISHLIST PROPS
                isWishlisted={isWishlisted}
                onWishlistToggle={toggleWishlist}
                wishlistLoading={wishlistLoading}
              />
            </div>

            {/* Quick Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-4">
                Quick Information
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property ID</span>
                  <span className="text-foreground font-medium">
                    {formattedPropertyId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listed Date</span>
                  <span className="text-foreground">
                    {new Date(property.listedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-foreground capitalize">
                    {property.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="text-foreground capitalize">
                    {property.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Area</span>
                  <span className="text-foreground">
                    {property.area} {property.areaUnit}
                  </span>
                </div>
                {/* 🔥 ADD WISHLIST STATUS - ONLY SHOW IF USER IS AUTHENTICATED */}
                {isAuthenticated() && (
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="text-muted-foreground">
                      Wishlist Status
                    </span>
                    <div className="flex items-center space-x-1">
                      <Heart
                        size={16}
                        className={
                          isWishlisted
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400"
                        }
                      />
                      <span
                        className={`text-sm font-medium ${
                          isWishlisted ? "text-red-500" : "text-foreground"
                        }`}
                      >
                        {isWishlisted ? "Saved" : "Not Saved"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 🔥 WISHLIST ERROR MESSAGE */}
            {wishlistError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-red-700">
                  <AlertCircle size={16} />
                  <span className="text-sm font-medium">{wishlistError}</span>
                </div>
              </div>
            )}

            {/* Contact Support */}
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <Icon
                name="Headphones"
                size={32}
                className="text-primary mx-auto mb-3"
              />
              <h4 className="font-semibold text-foreground mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is here to assist you with any questions.
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={handleCloseAppointmentModal}
        property={property}
        agent={property.agent}
      />

      <FloatingChat isOpen={isChatOpen} onToggle={handleToggleChat} />
    </div>
  );
};

export default React.memo(PropertyDetails);