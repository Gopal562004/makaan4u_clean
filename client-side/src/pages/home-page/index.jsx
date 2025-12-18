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

  // SEO Meta Data
  const seoData = {
    en: {
      title: "Makaan4U - Find Your Dream Property | Real Estate Platform",
      description:
        "Discover your perfect property with Makaan4U. Browse thousands of verified listings, connect with expert agents, and find your dream home in India's top cities.",
      keywords:
        "real estate, property, buy house, sell property, rent apartment, Mumbai, Delhi, Bangalore, Pune, real estate India, property search",
      canonical: "https://makaan4u.com",
    },
    hi: {
      title: "Makaan4U - अपनी सपनों की संपत्ति खोजें | रियल एस्टेट प्लेटफॉर्म",
      description:
        "Makaan4U के साथ अपनी सही संपत्ति खोजें। हजारों सत्यापित लिस्टिंग ब्राउज़ करें, विशेषज्ञ एजेंटों से जुड़ें, और भारत के शीर्ष शहरों में अपना सपनों का घर खोजें।",
      keywords:
        "रियल एस्टेट, संपत्ति, घर खरीदें, संपत्ति बेचें, अपार्टमेंट किराए पर, मुंबई, दिल्ली, बैंगलोर, पुणे",
      canonical: "https://makaan4u.com/hi",
    },
    mr: {
      title:
        "Makaan4U - तुमची स्वप्नांची मालमत्ता शोधा | रिअल इस्टेट प्लॅटफॉर्म",
      description:
        "Makaan4U सह तुमची योग्य मालमत्ता शोधा। हजारो सत्यापित लिस्टिंग ब्राउझ करा, तज्ञ एजंटशी जोडा आणि भारतातील अग्रगण्य शहरांमध्ये तुमचे स्वप्नांचे घर शोधा.",
      keywords:
        "रिअल इस्टेट, मालमत्ता, घर खरेदी, मालमत्ता विक्री, अपार्टमेंट भाडे, मुंबई, दिल्ली, बंगळूर, पुणे",
      canonical: "https://makaan4u.com/mr",
    },
  };

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Makaan4U",
    description:
      seoData[currentLanguage]?.description || seoData.en.description,
    url: "https://makaan4u.com",
    telephone: "+91-XXXXXXXXXX",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Maharashtra",
      addressLocality: "Mumbai",
    },
    areaServed: ["IN"],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "19.0760",
        longitude: "72.8777",
      },
      geoRadius: "500000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Real Estate Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Property Buying",
            description: "Find and buy your dream property",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Property Selling",
            description: "Sell your property with expert assistance",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Property Renting",
            description: "Rent apartments and houses",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.facebook.com/makaan4u",
      "https://www.twitter.com/makaan4u",
      "https://www.linkedin.com/company/makaan4u",
      "https://www.instagram.com/makaan4u",
    ],
  };

  // FAQ Structured Data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I search for properties on Makaan4U?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can search for properties using our advanced search filters by location, price range, property type, and amenities. Our platform provides detailed property information with photos and virtual tours.",
        },
      },
      {
        "@type": "Question",
        name: "Are all properties verified on Makaan4U?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all properties listed on Makaan4U undergo a thorough verification process to ensure authenticity and accuracy of information.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact property agents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can directly contact verified agents through their profile pages, schedule appointments, or use our chat feature for instant communication.",
        },
      },
      {
        "@type": "Question",
        name: "Is Makaan4U available in multiple languages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Makaan4U supports multiple languages including English, Hindi, and Marathi to serve users across different regions of India.",
        },
      },
    ],
  };

  const currentSeoData = seoData[currentLanguage] || seoData.en;

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{currentSeoData.title}</title>
        <meta name="description" content={currentSeoData.description} />
        <meta name="keywords" content={currentSeoData.keywords} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {/* Canonical URL */}
        <link rel="canonical" href={currentSeoData.canonical} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentSeoData.canonical} />
        <meta property="og:title" content={currentSeoData.title} />
        <meta property="og:description" content={currentSeoData.description} />
        <meta property="og:image" content="https://makaan4u.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Makaan4U - Real Estate Platform"
        />
        <meta property="og:site_name" content="Makaan4U" />
        <meta
          property="og:locale"
          content={
            currentLanguage === "hi"
              ? "hi_IN"
              : currentLanguage === "mr"
              ? "mr_IN"
              : "en_IN"
          }
        />

        {/* Twitter Cards */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentSeoData.canonical} />
        <meta property="twitter:title" content={currentSeoData.title} />
        <meta
          property="twitter:description"
          content={currentSeoData.description}
        />
        <meta
          property="twitter:image"
          content="https://makaan4u.com/twitter-image.jpg"
        />
        <meta
          property="twitter:image:alt"
          content="Makaan4U - Real Estate Platform"
        />
        <meta property="twitter:site" content="@makaan4u" />
        <meta property="twitter:creator" content="@makaan4u" />

        {/* Additional Meta Tags */}
        <meta name="author" content="Makaan4U" />
        <meta name="copyright" content="Makaan4U" />
        <meta name="language" content={currentLanguage} />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="safe for kids" />
        <meta name="distribution" content="global" />

        {/* Geo Tags */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />

        {/* Mobile Specific */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Makaan4U" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Makaan4U" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>

        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://makaan4u.com",
              },
            ],
          })}
        </script>

        {/* WebSite Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Makaan4U",
            url: "https://makaan4u.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://makaan4u.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
            description: currentSeoData.description,
            publisher: {
              "@type": "Organization",
              name: "Makaan4U",
              logo: {
                "@type": "ImageObject",
                url: "https://makaan4u.com/logo.png",
              },
            },
          })}
        </script>
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
          {/* <section className="py-12 bg-gray-50">
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
          </section> */}

          {/* Features Section - Compact */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  Why Choose Makaan4U
                </h1>
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
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h2>
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
        /* {isScrolled && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 w-10 h-10 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-gray-700 transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )} */
      </div>
    </>
  );
};

export default HomePage;
