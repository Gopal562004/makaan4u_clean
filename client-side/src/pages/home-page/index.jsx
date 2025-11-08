// // import React, { useState, useEffect } from "react";
// // import { Helmet } from "react-helmet";
// // import Header from "../../components/ui/Header";
// // import FloatingChat from "../../components/ui/FloatingChat";
// // import HeroSection from "./components/HeroSection";
// // import TrendingProperties from "./components/TrendingProperties";
// // import TestimonialsSection from "./components/TestimonialsSection";
// // import Footer from "./components/Footer";

// // const HomePage = () => {
// //   const [isChatOpen, setIsChatOpen] = useState(false);
// //   const [currentLanguage, setCurrentLanguage] = useState("en");
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const savedLanguage = localStorage.getItem("language") || "en";
// //     setCurrentLanguage(savedLanguage);

// //     // Mock user data - in real app this would come from auth context
// //     const mockUser = {
// //       id: 1,
// //       name: "John Doe",
// //       email: "john.doe@example.com",
// //       role: "buyer",
// //     };
// //     setUser(mockUser);
// //   }, []);

// //   const handleChatToggle = () => {
// //     setIsChatOpen(!isChatOpen);
// //   };

// //   const handleLogout = () => {
// //     setUser(null);
// //     localStorage.removeItem("user");
// //   };

// //   const handleSearch = (query) => {
// //     console.log("Search query:", query);
// //   };

// //   const pageTitle = {
// //     en: "RealConnect - Find Your Dream Property | Real Estate Platform",
// //     hi: "RealConnect - अपनी सपनों की संपत्ति खोजें | रियल एस्टेट प्लेटफॉर्म",
// //     mr: "RealConnect - तुमची स्वप्नांची मालमत्ता शोधा | रिअल इस्टेट प्लॅटफॉर्म",
// //   };

// //   const pageDescription = {
// //     en: "Discover your perfect property with RealConnect. Browse thousands of verified listings, connect with expert agents, and find your dream home in India's top cities.",
// //     hi: "RealConnect के साथ अपनी सही संपत्ति खोजें। हजारों सत्यापित लिस्टिंग ब्राउज़ करें, विशेषज्ञ एजेंटों से जुड़ें, और भारत के शीर्ष शहरों में अपना सपनों का घर खोजें।",
// //     mr: "RealConnect सह तुमची योग्य मालमत्ता शोधा। हजारो सत्यापित लिस्टिंग ब्राउझ करा, तज्ञ एजंटशी जोडा आणि भारतातील अग्रगण्य शहरांमध्ये तुमचे स्वप्नांचे घर शोधा.",
// //   };

// //   return (
// //     <>
// //       <Helmet>
// //         <title>{pageTitle?.[currentLanguage] || pageTitle?.en}</title>
// //         <meta
// //           name="description"
// //           content={pageDescription?.[currentLanguage] || pageDescription?.en}
// //         />
// //         <meta
// //           name="keywords"
// //           content="real estate, property, buy house, sell property, rent apartment, Mumbai, Delhi, Bangalore, Pune"
// //         />
// //         <meta
// //           property="og:title"
// //           content={pageTitle?.[currentLanguage] || pageTitle?.en}
// //         />
// //         <meta
// //           property="og:description"
// //           content={pageDescription?.[currentLanguage] || pageDescription?.en}
// //         />
// //         <meta property="og:type" content="website" />
// //         <meta property="og:url" content="https://realconnect.com" />
// //         <meta name="twitter:card" content="summary_large_image" />
// //         <meta
// //           name="twitter:title"
// //           content={pageTitle?.[currentLanguage] || pageTitle?.en}
// //         />
// //         <meta
// //           name="twitter:description"
// //           content={pageDescription?.[currentLanguage] || pageDescription?.en}
// //         />
// //         <link rel="canonical" href="https://realconnect.com" />
// //       </Helmet>
// //       <div className="min-h-screen bg-background">
// //         {/* Header */}
// //         <Header
// //           user={user}
// //           notificationCount={3}
// //           onLogout={handleLogout}
// //           onSearch={handleSearch}
// //         />

// //         {/* Main Content */}
// //         <main>
// //           {/* Hero Section */}
// //           <HeroSection />

// //           {/* Trending Properties */}
// //           <TrendingProperties />

// //           {/* Testimonials */}
// //           <TestimonialsSection />
// //         </main>

// //         {/* Footer */}
// //         <Footer />

// //         {/* Floating Chat */}
// //         <FloatingChat isOpen={isChatOpen} onToggle={handleChatToggle} />
// //       </div>
// //     </>
// //   );
// // };

// // export default HomePage;
// import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";
// import { motion } from "framer-motion";
// import Header from "../../components/ui/Header";
// import FloatingChat from "../../components/ui/FloatingChat";
// import HeroSection from "./components/HeroSection";
// import TrendingProperties from "./components/TrendingProperties";
// import TestimonialsSection from "./components/TestimonialsSection";
// import Footer from "./components/Footer";
// import {
//   Building2,
//   Users,
//   MapPin,
//   Award,
//   Shield,
//   Zap,
//   Globe,
//   TrendingUp,
//   ArrowUp,
// } from "lucide-react";

// const HomePage = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [currentLanguage, setCurrentLanguage] = useState("en");
//   const [user, setUser] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("language") || "en";
//     setCurrentLanguage(savedLanguage);

//     // Mock user data
//     const mockUser = {
//       id: 1,
//       name: "John Doe",
//       email: "john.doe@example.com",
//       role: "buyer",
//       avatar:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
//     };
//     setUser(mockUser);

//     // Scroll effect for header
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleChatToggle = () => {
//     setIsChatOpen(!isChatOpen);
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   const handleSearch = (query) => {
//     console.log("Search query:", query);
//   };

//   // Stats data
//   const stats = [
//     { icon: Building2, number: "50K+", label: "Properties Listed" },
//     { icon: Users, number: "10K+", label: "Happy Customers" },
//     { icon: MapPin, number: "25+", label: "Cities Covered" },
//     { icon: Award, number: "99%", label: "Satisfaction Rate" },
//   ];

//   // Features data
//   const features = [
//     {
//       icon: Shield,
//       title: "Verified Properties",
//       description:
//         "Every listing is thoroughly verified for authenticity and quality assurance.",
//     },
//     {
//       icon: Zap,
//       title: "Instant Notifications",
//       description:
//         "Get real-time alerts for new properties matching your preferences.",
//     },
//     {
//       icon: Globe,
//       title: "Virtual Tours",
//       description:
//         "Explore properties from anywhere with our immersive virtual tours.",
//     },
//     {
//       icon: TrendingUp,
//       title: "Market Insights",
//       description:
//         "Make informed decisions with comprehensive market data and analytics.",
//     },
//   ];

//   const pageTitle = {
//     en: "RealConnect - Find Your Dream Property | Real Estate Platform",
//     hi: "RealConnect - अपनी सपनों की संपत्ति खोजें | रियल एस्टेट प्लेटफॉर्म",
//     mr: "RealConnect - तुमची स्वप्नांची मालमत्ता शोधा | रिअल इस्टेट प्लॅटफॉर्म",
//   };

//   const pageDescription = {
//     en: "Discover your perfect property with RealConnect. Browse thousands of verified listings, connect with expert agents, and find your dream home in India's top cities.",
//     hi: "RealConnect के साथ अपनी सही संपत्ति खोजें। हजारों सत्यापित लिस्टिंग ब्राउज़ करें, विशेषज्ञ एजेंटों से जुड़ें, और भारत के शीर्ष शहरों में अपना सपनों का घर खोजें।",
//     mr: "RealConnect सह तुमची योग्य मालमत्ता शोधा। हजारो सत्यापित लिस्टिंग ब्राउझ करा, तज्ञ एजंटशी जोडा आणि भारतातील अग्रगण्य शहरांमध्ये तुमचे स्वप्नांचे घर शोधा.",
//   };

//   return (
//     <>
//       <Helmet>
//         <title>{pageTitle?.[currentLanguage] || pageTitle?.en}</title>
//         <meta
//           name="description"
//           content={pageDescription?.[currentLanguage] || pageDescription?.en}
//         />
//         <meta
//           name="keywords"
//           content="real estate, property, buy house, sell property, rent apartment, Mumbai, Delhi, Bangalore, Pune"
//         />
//         <meta
//           property="og:title"
//           content={pageTitle?.[currentLanguage] || pageTitle?.en}
//         />
//         <meta
//           property="og:description"
//           content={pageDescription?.[currentLanguage] || pageDescription?.en}
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://realconnect.com" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta
//           name="twitter:title"
//           content={pageTitle?.[currentLanguage] || pageTitle?.en}
//         />
//         <meta
//           name="twitter:description"
//           content={pageDescription?.[currentLanguage] || pageDescription?.en}
//         />
//         <link rel="canonical" href="https://realconnect.com" />
//       </Helmet>

//       <div className="min-h-screen bg-white">
//         {/* Header */}
//         <div
//           className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//             isScrolled
//               ? "bg-white shadow-sm border-b border-gray-200"
//               : "bg-white"
//           }`}
//         >
//           <Header
//             user={user}
//             notificationCount={3}
//             onLogout={handleLogout}
//             onSearch={handleSearch}
//           />
//         </div>

//         {/* Main Content */}
//         <main className="pt-16">
//           {/* Hero Section */}
//           <HeroSection />

//           {/* Stats Section */}
//           <section className="py-16 bg-gray-50">
//             <div className="container mx-auto px-4">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//                 {stats.map((stat, index) => (
//                   <div key={stat.label} className="text-center">
//                     <div className="flex justify-center mb-4">
//                       <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                         <stat.icon className="w-6 h-6 text-blue-600" />
//                       </div>
//                     </div>
//                     <h3 className="text-2xl font-semibold text-gray-900 mb-2">
//                       {stat.number}
//                     </h3>
//                     <p className="text-gray-600">{stat.label}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Features Section */}
//           <section className="py-16">
//             <div className="container mx-auto px-4">
//               <div className="text-center mb-12">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-4">
//                   Why Choose RealConnect
//                 </h2>
//                 <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                   Experience seamless property hunting with our trusted platform
//                   designed for your success.
//                 </p>
//               </div>

//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {features.map((feature, index) => (
//                   <div key={feature.title} className="text-center p-6">
//                     <div className="flex justify-center mb-4">
//                       <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                         <feature.icon className="w-6 h-6 text-blue-600" />
//                       </div>
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-600 leading-relaxed">
//                       {feature.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Trending Properties */}
//           <TrendingProperties />

//           {/* Testimonials */}
//           <TestimonialsSection />

//           {/* CTA Section */}
//           <section className="py-16 bg-gray-900">
//             <div className="container mx-auto px-4 text-center">
//               <h2 className="text-3xl font-bold text-white mb-4">
//                 Ready to Find Your Dream Home?
//               </h2>
//               <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
//                 Join thousands of satisfied customers who found their perfect
//                 property through RealConnect.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
//                   Browse Properties
//                 </button>
//                 <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200">
//                   Contact Agent
//                 </button>
//               </div>
//             </div>
//           </section>
//         </main>

//         {/* Footer */}
//         <Footer />

//         {/* Floating Chat */}
//         <FloatingChat isOpen={isChatOpen} onToggle={handleChatToggle} />

//         {/* Scroll to Top Button */}
//         {isScrolled && (
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="fixed bottom-6 right-6 w-10 h-10 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-gray-700 transition-colors duration-200"
//           >
//             <ArrowUp className="w-5 h-5" />
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default HomePage;
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import FloatingChat from "../../components/ui/FloatingChat";
import HeroSection from "./components/HeroSection";
import TrendingProperties from "./components/TrendingProperties";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";
import {
  Building2,
  Users,
  MapPin,
  Award,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  ArrowUp,
} from "lucide-react";

const HomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(savedLanguage);

    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "buyer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    };
    setUser(mockUser);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  // Stats data
  const stats = [
    { icon: Building2, number: "50K+", label: "Properties" },
    { icon: Users, number: "10K+", label: "Customers" },
    { icon: MapPin, number: "25+", label: "Cities" },
    { icon: Award, number: "99%", label: "Satisfaction" },
  ];

  // Features data
  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      description: "Every listing is thoroughly verified for authenticity.",
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Real-time alerts for new properties.",
    },
    {
      icon: Globe,
      title: "Virtual Tours",
      description: "Explore properties from anywhere.",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Comprehensive market data and analytics.",
    },
  ];

const pageTitle = {
  en: "Makaan4U - Find Your Dream Property | Real Estate Platform",
  hi: "Makaan4U - अपनी सपनों की संपत्ति खोजें | रियल एस्टेट प्लेटफॉर्म",
  mr: "Makaan4U - तुमची स्वप्नांची मालमत्ता शोधा | रिअल इस्टेट प्लॅटफॉर्म",
};

const pageDescription = {
  en: "Discover your perfect property with Makaan4U. Browse thousands of verified listings, connect with expert agents, and find your dream home in India's top cities.",
  hi: "Makaan4U के साथ अपनी सही संपत्ति खोजें। हजारों सत्यापित लिस्टिंग ब्राउज़ करें, विशेषज्ञ एजेंटों से जुड़ें, और भारत के शीर्ष शहरों में अपना सपनों का घर खोजें।",
  mr: "Makaan4U सह तुमची योग्य मालमत्ता शोधा। हजारो सत्यापित लिस्टिंग ब्राउझ करा, तज्ञ एजंटशी जोडा आणि भारतातील अग्रगण्य शहरांमध्ये तुमचे स्वप्नांचे घर शोधा.",
};


  return (
    <>
      <Helmet>
        <title>{pageTitle?.[currentLanguage] || pageTitle?.en}</title>
        <meta
          name="description"
          content={pageDescription?.[currentLanguage] || pageDescription?.en}
        />
        <meta
          name="keywords"
          content="real estate, property, buy house, sell property, rent apartment, Mumbai, Delhi, Bangalore, Pune"
        />
        <meta
          property="og:title"
          content={pageTitle?.[currentLanguage] || pageTitle?.en}
        />
        <meta
          property="og:description"
          content={pageDescription?.[currentLanguage] || pageDescription?.en}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://realconnect.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={pageTitle?.[currentLanguage] || pageTitle?.en}
        />
        <meta
          name="twitter:description"
          content={pageDescription?.[currentLanguage] || pageDescription?.en}
        />
        <link rel="canonical" href="https://realconnect.com" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-white shadow-sm border-b border-gray-200"
              : "bg-white"
          }`}
        >
          <Header
            user={user}
            notificationCount={3}
            onLogout={handleLogout}
            onSearch={handleSearch}
          />
        </div>

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Stats Section - Compact */}
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {stat.number}
                    </h3>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section - Compact */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Why Choose RealConnect
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto text-sm">
                  Experience seamless property hunting with our trusted
                  platform.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div key={feature.title} className="text-center p-4">
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trending Properties */}
          <TrendingProperties />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* CTA Section - Compact */}
          <section className="py-12 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto text-sm">
                Join thousands of satisfied customers who found their perfect
                property.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-5 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm">
                  Browse Properties
                </button>
                <button className="px-5 py-2 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200 text-sm">
                  Contact Agent
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Chat */}
        <FloatingChat isOpen={isChatOpen} onToggle={handleChatToggle} />

        {/* Scroll to Top Button */}
        {isScrolled && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 w-10 h-10 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-gray-700 transition-colors duration-200"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );
};

export default HomePage;