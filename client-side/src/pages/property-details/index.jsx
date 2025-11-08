// // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // import { useSearchParams, useNavigate } from "react-router-dom";
// // import Header from "../../components/ui/Header";
// // import FloatingChat from "../../components/ui/FloatingChat";
// // import PropertyImageGallery from "./components/PropertyImageGallery";
// // import PropertyInfo from "./components/PropertyInfo";
// // import AgentCard from "./components/AgentCard";
// // import AppointmentModal from "./components/AppointmentModal";
// // import PropertyLocation from "./components/PropertyLocation";
// // import SimilarProperties from "./components/SimilarProperties";
// // import PropertyActions from "./components/PropertyActions";
// // import Icon from "../../components/AppIcon";
// // import Button from "../../components/ui/Button";

// // // Move mock data outside component to prevent recreation on every render
// // const mockProperty = {
// //   id: 1,
// //   title: "Luxury 3BHK Apartment with Premium Amenities",
// //   price: 15000000,
// //   originalPrice: 16500000,
// //   location: "Andheri West, Mumbai",
// //   address: "Plot No. 123, Veera Desai Road, Andheri West",
// //   pincode: "400053",
// //   coordinates: {
// //     lat: 19.1334,
// //     lng: 72.8267,
// //   },
// //   status: "available",
// //   featured: true,
// //   bedrooms: 3,
// //   bathrooms: 2,
// //   area: 1250,
// //   type: "Apartment",
// //   builtYear: "2022",
// //   parking: "2 Covered",
// //   description: `This stunning 3BHK apartment offers the perfect blend of luxury and comfort in the heart of Andheri West. Featuring spacious rooms with premium finishes, modern amenities, and excellent connectivity to major business districts.\n\nThe apartment boasts of high-quality Italian marble flooring, modular kitchen with branded appliances, and large windows offering abundant natural light. The building features 24/7 security, power backup, and recreational facilities.\n\nLocated in a prime area with easy access to metro stations, shopping malls, schools, and hospitals. This is an ideal investment opportunity for both end-users and investors.`,
// //   amenities: [
// //     "Swimming Pool",
// //     "Gymnasium",
// //     "Children's Play Area",
// //     "Landscaped Gardens",
// //     "24/7 Security",
// //     "Power Backup",
// //     "Lift",
// //     "Parking",
// //     "Club House",
// //     "Jogging Track",
// //     "Indoor Games",
// //     "CCTV Surveillance",
// //   ],
// //   features: [
// //     "Premium Italian marble flooring throughout the apartment",
// //     "Modular kitchen with granite countertops and branded appliances",
// //     "Master bedroom with attached bathroom and walk-in wardrobe",
// //     "Large balconies with city views from all bedrooms",
// //     "High-speed internet connectivity and cable TV points",
// //     "Earthquake resistant RCC structure with modern architecture",
// //   ],
// //   images: [
// //     {
// //       url: "https://images.unsplash.com/photo-1698673786592-cd5730baf7d7",
// //       alt: "Spacious living room with modern furniture, large windows, and elegant interior design",
// //     },
// //     {
// //       url: "https://images.unsplash.com/photo-1609766856923-7e0a0c06584d",
// //       alt: "Modern kitchen with granite countertops, stainless steel appliances, and ample storage",
// //     },
// //     {
// //       url: "https://images.unsplash.com/photo-1723470918065-13488200464c",
// //       alt: "Master bedroom with king-size bed, wooden flooring, and large windows with city view",
// //     },
// //     {
// //       url: "https://images.unsplash.com/photo-1730881123778-053fc13c501c",
// //       alt: "Luxurious bathroom with modern fixtures, marble tiles, and glass shower enclosure",
// //     },
// //     {
// //       url: "https://images.unsplash.com/photo-1725003940447-4663f27fab8e",
// //       alt: "Spacious balcony with outdoor furniture overlooking city skyline and green spaces",
// //     },
// //   ],
// //   agent: {
// //     id: 1,
// //     name: "Rajesh Kumar",
// //     designation: "Senior Property Consultant",
// //     avatar: "https://images.unsplash.com/photo-1691671318357-370ca801ad5f",
// //     avatarAlt:
// //       "Professional headshot of middle-aged Indian man with mustache in formal blue shirt",
// //     phone: "+91 98765 43210",
// //     email: "rajesh.kumar@realconnect.com",
// //     location: "Andheri West, Mumbai",
// //     rating: 4.8,
// //     reviewCount: 127,
// //     propertiesSold: 85,
// //     experience: "8+",
// //     languages: ["English", "Hindi", "Marathi", "Gujarati"],
// //   },
// // };

// // const PropertyDetails = () => {
// //   const [searchParams] = useSearchParams();
// //   const navigate = useNavigate();
// //   const [property, setProperty] = useState(null);
// //   const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
// //   const [isChatOpen, setIsChatOpen] = useState(false);
// //   const [activeTab, setActiveTab] = useState("overview");
// //   const [user, setUser] = useState(null);

// //   // Memoize tabs configuration to prevent recreation
// //   const tabs = useMemo(
// //     () => [
// //       { id: "overview", label: "Overview", icon: "Home" },
// //       { id: "location", label: "Location", icon: "MapPin" },
// //       { id: "similar", label: "Similar Properties", icon: "Building2" },
// //     ],
// //     []
// //   );

// //   // Optimize useEffect with proper dependencies
// //   useEffect(() => {
// //     // Simulate loading property data
// //     const propertyId = searchParams?.get("id") || "1";
// //     setProperty(mockProperty);

// //     // Mock user data
// //     setUser({
// //       name: "John Doe",
// //       email: "john.doe@example.com",
// //       role: "buyer",
// //     });
// //   }, [searchParams]);

// //   // Memoize handlers to prevent unnecessary re-renders
// //   const handleScheduleViewing = useCallback(() => {
// //     setIsAppointmentModalOpen(true);
// //   }, []);

// //   const handleWhatsAppContact = useCallback(() => {
// //     if (!property?.agent?.phone) return;

// //     const message = encodeURIComponent(
// //       `Hi ${property.agent.name}, I'm interested in the property: ${property.title}. Can we schedule a viewing?`
// //     );
// //     const phoneNumber = property.agent.phone.replace(/\D/g, "");
// //     window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
// //   }, [property]);

// //   const handleBackToListings = useCallback(() => {
// //     navigate("/property-listings");
// //   }, [navigate]);

// //   const handleCloseAppointmentModal = useCallback(() => {
// //     setIsAppointmentModalOpen(false);
// //   }, []);

// //   const handleToggleChat = useCallback(() => {
// //     setIsChatOpen((prev) => !prev);
// //   }, []);

// //   const handleTabChange = useCallback((tabId) => {
// //     setActiveTab(tabId);
// //   }, []);

// //   const handleHomeNavigate = useCallback(() => {
// //     navigate("/home-page");
// //   }, [navigate]);

// //   // Memoize property ID formatting
// //   const formattedPropertyId = useMemo(() => {
// //     return property ? `RC${property.id.toString().padStart(6, "0")}` : "";
// //   }, [property]);

// //   // Memoize tab content to prevent unnecessary re-renders
// //   const tabContent = useMemo(() => {
// //     switch (activeTab) {
// //       case "overview":
// //         return <PropertyInfo property={property} />;
// //       case "location":
// //         return <PropertyLocation property={property} />;
// //       case "similar":
// //         return <SimilarProperties currentPropertyId={property?.id} />;
// //       default:
// //         return <PropertyInfo property={property} />;
// //     }
// //   }, [activeTab, property]);

// //   // Loading state
// //   if (!property) {
// //     return (
// //       <div className="min-h-screen bg-background">
// //         <Header user={user} />
// //         <div className="flex items-center justify-center h-96">
// //           <div className="text-center">
// //             <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
// //             <p className="text-muted-foreground">Loading property details...</p>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Header
// //         user={user}
// //         onLogout={() => navigate("/login")}
// //         onSearch={() => {}}
// //       />

// //       <main className="container mx-auto px-4 py-6">
// //         {/* Breadcrumb */}
// //         <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
// //           <button
// //             onClick={handleHomeNavigate}
// //             className="hover:text-foreground transition-smooth"
// //           >
// //             Home
// //           </button>
// //           <Icon name="ChevronRight" size={16} />
// //           <button
// //             onClick={handleBackToListings}
// //             className="hover:text-foreground transition-smooth"
// //           >
// //             Properties
// //           </button>
// //           <Icon name="ChevronRight" size={16} />
// //           <span className="text-foreground">Property Details</span>
// //         </div>

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
// //             {/* Image Gallery */}
// //             <PropertyImageGallery images={property.images} />

// //             {/* Mobile Actions */}
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
// //             {/* Agent Card */}
// //             <AgentCard
// //               agent={property.agent}
// //               onScheduleViewing={handleScheduleViewing}
// //               onWhatsAppContact={handleWhatsAppContact}
// //             />

// //             {/* Desktop Actions */}
// //             <div className="hidden lg:block">
// //               <PropertyActions
// //                 property={property}
// //                 onScheduleViewing={handleScheduleViewing}
// //                 onWhatsAppContact={handleWhatsAppContact}
// //               />
// //             </div>

// //             {/* Quick Info Card */}
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
// //                   <span className="text-foreground">15 Oct 2024</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Property Age</span>
// //                   <span className="text-foreground">2 Years</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Possession</span>
// //                   <span className="text-foreground">Ready to Move</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Facing</span>
// //                   <span className="text-foreground">North-East</span>
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

// //       {/* Appointment Modal */}
// //       <AppointmentModal
// //         isOpen={isAppointmentModalOpen}
// //         onClose={handleCloseAppointmentModal}
// //         property={property}
// //         agent={property.agent}
// //       />

// //       {/* Floating Chat */}
// //       <FloatingChat isOpen={isChatOpen} onToggle={handleToggleChat} />
// //     </div>
// //   );
// // };

// // export default React.memo(PropertyDetails);
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "../../components/ui/Header";
// import FloatingChat from "../../components/ui/FloatingChat";
// import PropertyImageGallery from "./components/PropertyImageGallery";
// import PropertyInfo from "./components/PropertyInfo";
// import AgentCard from "./components/AgentCard";
// import AppointmentModal from "./components/AppointmentModal";
// import PropertyLocation from "./components/PropertyLocation";
// import SimilarProperties from "./components/SimilarProperties";
// import PropertyActions from "./components/PropertyActions";
// import Icon from "../../components/AppIcon";
// import Button from "../../components/ui/Button";
// import { getPropertyById } from "../../lib/mongo/services/propertyService";

// const PropertyDetails = () => {
//   const { id: propertyId } = useParams();
//   const navigate = useNavigate();

//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [user, setUser] = useState(null);

//   // Transform API data to match component expectations
//   const transformPropertyData = useCallback((apiData) => {
//     if (!apiData) return null;

//     return {
//       // Basic info
//       id: apiData._id,
//       title: apiData.title,
//       description: apiData.description,
//       price: apiData.price,
//       originalPrice: apiData.originalPrice,

//       // Location - handle object structure
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
//       type: apiData.specifications?.type,
//       builtYear: apiData.specifications?.builtYear,
//       parking: apiData.specifications?.parking,

//       // Arrays
//       amenities: apiData.amenities || [],
//       features: apiData.features || [],
//       images: apiData.images || [],

//       // Agent info - handle object structure
//       agent: {
//         id: apiData.postedBy?._id,
//         name: apiData.postedBy?.name,
//         designation: apiData.postedBy?.designation || "Property Consultant",
//         avatar: apiData.postedBy?.avatar,
//         avatarAlt: `Professional photo of ${apiData.postedBy?.name}`,
//         phone: apiData.postedBy?.phone || "+919876543210",
//         email: apiData.postedBy?.email,
//         location: apiData.postedBy?.location || "Mumbai",
//         // Handle rating object
//         rating:
//           typeof apiData.postedBy?.rating === "number"
//             ? apiData.postedBy.rating
//             : apiData.postedBy?.rating?.average || 0,
//         reviewCount:
//           typeof apiData.postedBy?.rating === "number"
//             ? 0
//             : apiData.postedBy?.rating?.totalReviews || 0,
//         propertiesSold: apiData.postedBy?.propertiesSold || 0,
//         experience: apiData.postedBy?.experience || "5+",
//         languages: apiData.postedBy?.languages || ["English", "Hindi"],
//       },

//       // Additional fields for components
//       listedDate: apiData.listedDate || new Date().toISOString(),
//       propertyId: apiData.propertyId || `RC${apiData._id?.slice(-6)}`,
//     };
//   }, []);

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
//         console.log("Fetching property with ID:", propertyId);

//         if (!propertyId) {
//           setError("No property ID found in URL");
//           setLoading(false);
//           return;
//         }

//         const res = await getPropertyById(propertyId);
//         const transformedProperty = transformPropertyData(res.property);
//         setProperty(transformedProperty);
//         console.log("Transformed property:", transformedProperty);
//       } catch (err) {
//         console.error("Error fetching property:", err);
//         setError(err.message || "Failed to load property details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperty();

//     // Mock user data
//     setUser({
//       name: "John Doe",
//       email: "john.doe@example.com",
//       role: "buyer",
//     });
//   }, [propertyId, transformPropertyData]);

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

//   // ✅ Simple WhatsApp contact like in commented code
//   const handleWhatsAppContact = useCallback(() => {
//     if (!property?.agent?.phone) return;

//     const message = encodeURIComponent(
//       `Hi ${property.agent.name}, I'm interested in the property: ${property.title}. Can we schedule a viewing?`
//     );
//     const phoneNumber = property.agent.phone.replace(/\D/g, "");
//     window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
//   }, [property]);

//   // ✅ Simple Email contact
//   const handleEmailContact = useCallback(() => {
//     if (!property?.agent?.email) return;

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
//         return <SimilarProperties currentPropertyId={property?.id} />;
//       default:
//         return <PropertyInfo property={property} />;
//     }
//   }, [activeTab, property]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading property details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 font-medium mb-4">{error}</p>
//           <Button onClick={handleBackToListings}>
//             Back to Property Listings
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
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
//       <Header
//         user={user}
//         onLogout={() => navigate("/login")}
//         onSearch={() => {}}
//       />

//       <main className="container mx-auto px-4 py-6">
//         {/* Breadcrumb */}
//         <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
//           <button
//             onClick={handleHomeNavigate}
//             className="hover:text-foreground transition-smooth"
//           >
//             Home
//           </button>
//           <Icon name="ChevronRight" size={16} />
//           <button
//             onClick={handleBackToListings}
//             className="hover:text-foreground transition-smooth"
//           >
//             Properties
//           </button>
//           <Icon name="ChevronRight" size={16} />
//           <span className="text-foreground">Property Details</span>
//         </div>

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
//             <PropertyImageGallery images={property.images} />

//             <div className="lg:hidden">
//               <PropertyActions
//                 property={property}
//                 onScheduleViewing={handleScheduleViewing}
//                 onWhatsAppContact={handleWhatsAppContact}
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

//           {/* Sidebar - Fixed Agent Card for Desktop */}
//           <div className="space-y-6">
//             {/* Fixed Agent Card for Desktop */}
//             <div className="hidden lg:block sticky top-24 z-10">
//               <AgentCard
//                 agent={property.agent}
//                 onScheduleViewing={handleScheduleViewing}
//                 onWhatsAppContact={handleWhatsAppContact}
//                 onEmailContact={handleEmailContact}
//               />
//             </div>

//             {/* Mobile Agent Card */}
//             <div className="lg:hidden">
//               <AgentCard
//                 agent={property.agent}
//                 onScheduleViewing={handleScheduleViewing}
//                 onWhatsAppContact={handleWhatsAppContact}
//                 onEmailContact={handleEmailContact}
//               />
//             </div>

//             <div className="hidden lg:block">
//               <PropertyActions
//                 property={property}
//                 onScheduleViewing={handleScheduleViewing}
//                 onWhatsAppContact={handleWhatsAppContact}
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
//                   <span className="text-foreground">{property.area} sq ft</span>
//                 </div>
//               </div>
//             </div>

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
import Header from "../../components/ui/Header";
import FloatingChat from "../../components/ui/FloatingChat";
import PropertyImageGallery from "./components/PropertyImageGallery";
import PropertyInfo from "./components/PropertyInfo";
import AgentCard from "./components/AgentCard";
import AppointmentModal from "./components/AppointmentModal";
import PropertyLocation from "./components/PropertyLocation";
import SimilarProperties from "./components/SimilarProperties";
import PropertyActions from "./components/PropertyActions";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { getPropertyById } from "../../lib/mongo/services/propertyService";
import { AlertCircle } from "lucide-react";
const PropertyDetails = () => {
  const { id: propertyId } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);

  // Transform API data to match component expectations
  // const transformPropertyData = useCallback((apiData) => {
  //   if (!apiData) return null;

  //   return {
  //     // Basic info
  //     id: apiData._id,
  //     title: apiData.title,
  //     description: apiData.description,
  //     price: apiData.price,
  //     originalPrice: apiData.originalPrice,

  //     // Location - handle object structure
  //     location:
  //       typeof apiData.location === "string"
  //         ? apiData.location
  //         : apiData.location?.address ||
  //           `${apiData.location?.city}, ${apiData.location?.state}`,
  //     address:
  //       typeof apiData.location === "string"
  //         ? apiData.location
  //         : apiData.location?.address,
  //     pincode:
  //       typeof apiData.location === "string" ? "" : apiData.location?.pincode,
  //     coordinates:
  //       typeof apiData.location === "string"
  //         ? { lat: 0, lng: 0 }
  //         : apiData.location?.coordinates || { lat: 0, lng: 0 },

  //     // Status
  //     status: apiData.status,
  //     featured: apiData.featured,

  //     // Specifications
  //     bedrooms: apiData.specifications?.bedrooms,
  //     bathrooms: apiData.specifications?.bathrooms,
  //     area: apiData.specifications?.area,
  //     type: apiData.specifications?.type,
  //     builtYear: apiData.specifications?.builtYear,
  //     parking: apiData.specifications?.parking,

  //     // Arrays
  //     amenities: apiData.amenities || [],
  //     features: apiData.features || [],
  //     images: apiData.images || [],

  //     // Agent info - handle object structure
  //     agent: {
  //       id: apiData.postedBy?._id,
  //       name: apiData.postedBy?.name,
  //       designation: apiData.postedBy?.designation || "Property Consultant",
  //       avatar: apiData.postedBy?.avatar,
  //       avatarAlt: `Professional photo of ${apiData.postedBy?.name}`,
  //       phone: apiData.postedBy?.phone || "+919876543210",
  //       email: apiData.postedBy?.email,
  //       location: apiData.postedBy?.location || "Mumbai",
  //       // Handle rating object
  //       rating:
  //         typeof apiData.postedBy?.rating === "number"
  //           ? apiData.postedBy.rating
  //           : apiData.postedBy?.rating?.average || 0,
  //       reviewCount:
  //         typeof apiData.postedBy?.rating === "number"
  //           ? 0
  //           : apiData.postedBy?.rating?.totalReviews || 0,
  //       propertiesSold: apiData.postedBy?.propertiesSold || 0,
  //       experience: apiData.postedBy?.experience || "5+",
  //       languages: apiData.postedBy?.languages || ["English", "Hindi"],
  //     },

  //     // Additional fields for components
  //     listedDate: apiData.listedDate || new Date().toISOString(),
  //     propertyId: apiData.propertyId || `RC${apiData._id?.slice(-6)}`,
  //   };
  // }, []);
  // Enhanced transform function that checks both agentInfo and postedBy
  const transformPropertyData = useCallback((apiData) => {
    if (!apiData) return null;

    console.log("Raw API data:", apiData);
    console.log("Agent info:", apiData.agentInfo);
    console.log("Posted by:", apiData.postedBy);

    // Determine which agent data to use
    let agentData = {};

    if (
      apiData.agentInfo &&
      apiData.agentInfo.name &&
      apiData.agentInfo.name !== "Agent"
    ) {
      // Use agentInfo from property schema (manual agent or auto-populated)
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
      // Use postedBy user data
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
      // Fallback to default agent data
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
      type: apiData.specifications?.type,
      builtYear: apiData.specifications?.builtYear,
      parking: apiData.specifications?.parking,

      // Arrays
      amenities: apiData.amenities || [],
      features: apiData.features || [],
      images: apiData.images || [],

      // ✅ Use the determined agent data
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
        //console.log("Fetching property with ID:", property);

        if (!propertyId) {
          setError("No property ID found in URL");
          setLoading(false);
          return;
        }

        const res = await getPropertyById(propertyId);
        const transformedProperty = transformPropertyData(res.property);
        setProperty(transformedProperty);
        console.log("Transformed property:", transformedProperty.agent);
        console.log("property:");
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(err.message || "Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();

    // Mock user data
    setUser({
      name: "John Doe",
      email: "john.doe@example.com",
      role: "buyer",
    });
  }, [propertyId, transformPropertyData]);

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

  // ✅ Simple WhatsApp contact like in commented code
  const handleWhatsAppContact = useCallback(() => {
    if (!property?.agent?.phone) return;

    const message = encodeURIComponent(
      `Hi ${property.agent.name}, I'm interested in the property: ${property.title}. Can we schedule a viewing?`
    );
    const phoneNumber = property.agent.phone.replace(/\D/g, "");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  }, [property]);

  // ✅ Simple Email contact
  const handleEmailContact = useCallback(() => {
    if (!property?.agent?.email) return;

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
        return <SimilarProperties currentPropertyId={property?.id} />;
      default:
        return <PropertyInfo property={property} />;
    }
  }, [activeTab, property]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          {/* Error Message */}
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Something went wrong
          </h2>
          <p className="text-red-500 font-medium mb-2">{error}</p>
          <p className="text-gray-600 text-sm mb-6">
            We encountered an issue while loading this page.
          </p>

          {/* Action Button */}
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
      <Header
        user={user}
        onLogout={() => navigate("/login")}
        onSearch={() => {}}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <button
            onClick={handleHomeNavigate}
            className="hover:text-foreground transition-smooth"
          >
            Home
          </button>
          <Icon name="ChevronRight" size={16} />
          <button
            onClick={handleBackToListings}
            className="hover:text-foreground transition-smooth"
          >
            Properties
          </button>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground">Property Details</span>
        </div>

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
            <PropertyImageGallery images={property.images} />

            <div className="lg:hidden">
              <PropertyActions
                property={property}
                onScheduleViewing={handleScheduleViewing}
                onWhatsAppContact={handleWhatsAppContact}
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

          {/* Sidebar - Normal Position (No sticky/fixed) */}
          <div className="space-y-6">
            {/* Agent Card - Normal position, doesn't move with scroll */}
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
                  <span className="text-foreground">{property.area} sq ft</span>
                </div>
              </div>
            </div>

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