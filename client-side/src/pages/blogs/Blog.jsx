// import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";
// import Header from "../../components/ui/Header";
// import Footer from "../../pages/home-page/components/Footer";
// import FloatingChat from "../../components/ui/FloatingChat";
// import BlogHero from "./components/BlogHero";
// import CategoryFilters from "./components/CategoryFilters";
// import FeaturedStories from "./components/FeaturedStories";
// import BlogShowcase from "./components/BlogShowcase";
// import TrendingTopics from "./components/TrendingTopics";
// import ExpertSpotlight from "./components/ExpertSpotlight";
// import StatsOverview from "./components/StatsOverview";

// const Blog = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [currentView, setCurrentView] = useState("grid");

//   useEffect(() => {
//     const mockUser = {
//       id: 1,
//       name: "John Doe",
//       email: "john.doe@example.com",
//       role: "buyer",
//       avatar:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
//     };
//     setUser(mockUser);

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
//     setSearchQuery(query);
//   };

//   const handleCategoryChange = (categoryId) => {
//     setSelectedCategory(categoryId);
//   };

//   // Blog categories with icons and colors
//   const categories = [
//     {
//       id: "all",
//       name: "All Stories",
//       count: 42,
//       color: "gray",
//       icon: "📚",
//     },
//     {
//       id: "buying",
//       name: "Buying Guide",
//       count: 12,
//       color: "blue",
//       icon: "🏠",
//     },
//     {
//       id: "selling",
//       name: "Selling Tips",
//       count: 8,
//       color: "green",
//       icon: "💰",
//     },
//     {
//       id: "investment",
//       name: "Investment",
//       count: 9,
//       color: "purple",
//       icon: "📈",
//     },
//     {
//       id: "market",
//       name: "Market Trends",
//       count: 7,
//       color: "orange",
//       icon: "🌐",
//     },
//     {
//       id: "legal",
//       name: "Legal Advice",
//       count: 4,
//       color: "red",
//       icon: "⚖️",
//     },
//     {
//       id: "design",
//       name: "Home Design",
//       count: 2,
//       color: "pink",
//       icon: "🎨",
//     },
//   ];

//   // Blog posts data
//   const blogPosts = [
//     {
//       id: 1,
//       title: "The Future of Urban Living: Smart Homes in 2024",
//       excerpt:
//         "Explore how technology is transforming urban living spaces and what it means for home buyers and investors.",
//       image:
//         "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       category: "market",
//       author: {
//         name: "Sarah Johnson",
//         role: "Real Estate Analyst",
//         avatar:
//           "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
//       },
//       date: "2024-01-15",
//       readTime: "8 min read",
//       views: 1250,
//       comments: 34,
//       likes: 89,
//       tags: ["smart homes", "technology", "urban living", "future"],
//       featured: true,
//       trending: true,
//       premium: false,
//     },
//     {
//       id: 2,
//       title: "Investment Blueprint: Building Wealth Through Real Estate",
//       excerpt:
//         "A comprehensive guide to creating and managing a profitable real estate investment portfolio from scratch.",
//       image:
//         "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       category: "investment",
//       author: {
//         name: "Mike Chen",
//         role: "Investment Strategist",
//         avatar:
//           "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
//       },
//       date: "2024-01-12",
//       readTime: "12 min read",
//       views: 890,
//       comments: 21,
//       likes: 67,
//       tags: ["investment", "wealth building", "portfolio", "strategies"],
//       featured: true,
//       trending: true,
//       premium: true,
//     },
//     {
//       id: 3,
//       title: "The Psychology of Home Buying: What Drives Our Decisions",
//       excerpt:
//         "Understanding the emotional and psychological factors that influence home buying decisions in today's market.",
//       image:
//         "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       category: "buying",
//       author: {
//         name: "Dr. Emily Roberts",
//         role: "Behavioral Psychologist",
//         avatar:
//           "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
//       },
//       date: "2024-01-10",
//       readTime: "10 min read",
//       views: 1560,
//       comments: 45,
//       likes: 112,
//       tags: ["psychology", "decision making", "buyer behavior", "market"],
//       featured: true,
//       trending: false,
//       premium: false,
//     },
//     {
//       id: 4,
//       title: "Sustainable Living: Eco-Friendly Homes That Save Money",
//       excerpt:
//         "Discover how sustainable home features can reduce your carbon footprint and save thousands in utility costs.",
//       image:
//         "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       category: "design",
//       author: {
//         name: "Lisa Thompson",
//         role: "Sustainability Expert",
//         avatar:
//           "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
//       },
//       date: "2024-01-08",
//       readTime: "7 min read",
//       views: 980,
//       comments: 18,
//       likes: 54,
//       tags: [
//         "sustainability",
//         "eco-friendly",
//         "energy efficiency",
//         "green homes",
//       ],
//       featured: false,
//       trending: true,
//       premium: false,
//     },
//     {
//       id: 5,
//       title: "Legal Framework: Navigating Property Laws in 2024",
//       excerpt:
//         "Essential legal updates and compliance requirements for property transactions in the current regulatory landscape.",
//       image:
//         "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       category: "legal",
//       author: {
//         name: "Advocate Priya Sharma",
//         role: "Property Law Specialist",
//         avatar:
//           "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
//       },
//       date: "2024-01-05",
//       readTime: "15 min read",
//       views: 1120,
//       comments: 29,
//       likes: 43,
//       tags: ["legal", "property law", "compliance", "regulations"],
//       featured: false,
//       trending: false,
//       premium: true,
//     },
//     {
//       id: 6,
//       title: "The Art of Negotiation: Getting the Best Deal on Your Dream Home",
//       excerpt:
//         "Master negotiation strategies used by top real estate agents to secure the best possible price for your property.",
//       image:
//         "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       category: "buying",
//       author: {
//         name: "David Wilson",
//         role: "Negotiation Coach",
//         avatar:
//           "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//       },
//       date: "2024-01-03",
//       readTime: "9 min read",
//       views: 1340,
//       comments: 32,
//       likes: 78,
//       tags: ["negotiation", "buying strategy", "real estate deals", "pricing"],
//       featured: false,
//       trending: true,
//       premium: false,
//     },
//   ];

//   // Experts data
//   const experts = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       role: "Market Analyst",
//       expertise: "Urban Development & Smart Cities",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
//       articles: 24,
//       experience: "8 years",
//     },
//     {
//       id: 2,
//       name: "Mike Chen",
//       role: "Investment Strategist",
//       expertise: "Portfolio Management & ROI Optimization",
//       avatar:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//       articles: 18,
//       experience: "12 years",
//     },
//     {
//       id: 3,
//       name: "Dr. Emily Roberts",
//       role: "Behavioral Psychologist",
//       expertise: "Buyer Psychology & Decision Making",
//       avatar:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
//       articles: 15,
//       experience: "6 years",
//     },
//   ];

//   const filteredPosts = blogPosts.filter((post) => {
//     const matchesCategory =
//       selectedCategory === "all" || post.category === selectedCategory;
//     const matchesSearch =
//       searchQuery === "" ||
//       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.tags.some((tag) =>
//         tag.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     return matchesCategory && matchesSearch;
//   });

//   const featuredPosts = blogPosts.filter((post) => post.featured);
//   const trendingPosts = blogPosts.filter((post) => post.trending);

//   return (
//     <>
//       <Helmet>
//         <title>Makaan4U Insights - Real Estate Knowledge Hub</title>
//         <meta
//           name="description"
//           content="Expert real estate insights, market analysis, investment strategies, and home buying guides from industry professionals."
//         />
//         <meta
//           name="keywords"
//           content="real estate blog, property insights, market trends, investment strategies, home buying guide"
//         />
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
//           <BlogHero
//             searchQuery={searchQuery}
//             onSearchChange={setSearchQuery}
//             onSearchSubmit={handleSearch}
//             totalArticles={blogPosts.length}
//           />

//           <StatsOverview posts={blogPosts} />

//           <CategoryFilters
//             categories={categories}
//             selectedCategory={selectedCategory}
//             onCategoryChange={handleCategoryChange}
//             currentView={currentView}
//             onViewChange={setCurrentView}
//           />

//           <FeaturedStories posts={featuredPosts} />

//           <div className="max-w-7xl mx-auto px-4 py-16">
//             <div className="grid lg:grid-cols-4 gap-8">
//               <div className="lg:col-span-3">
//                 <BlogShowcase posts={filteredPosts} currentView={currentView} />
//               </div>

//               <div className="space-y-8">
//                 <TrendingTopics posts={trendingPosts} />
//                 <ExpertSpotlight experts={experts} />
//               </div>
//             </div>
//           </div>
//         </main>

//         <Footer />
//         <FloatingChat isOpen={isChatOpen} onToggle={handleChatToggle} />
//       </div>
//     </>
//   );
// };

// export default Blog;
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import Footer from "../../pages/home-page/components/Footer";
import FloatingChat from "../../components/ui/FloatingChat";
import BlogHero from "./components/BlogHero";
import CategoryFilters from "./components/CategoryFilters";
import FeaturedStories from "./components/FeaturedStories";
import BlogShowcase from "./components/BlogShowcase";
import TrendingTopics from "./components/TrendingTopics";
import ExpertSpotlight from "./components/ExpertSpotlight";
import StatsOverview from "./components/StatsOverview";

const Blog = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentView, setCurrentView] = useState("grid");

  useEffect(() => {
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
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Blog categories with icons and colors
  const categories = [
    {
      id: "all",
      name: "All Stories",
      count: 42,
      color: "gray",
      icon: "📚",
    },
    {
      id: "buying",
      name: "Buying Guide",
      count: 12,
      color: "blue",
      icon: "🏠",
    },
    {
      id: "selling",
      name: "Selling Tips",
      count: 8,
      color: "green",
      icon: "💰",
    },
    {
      id: "investment",
      name: "Investment",
      count: 9,
      color: "purple",
      icon: "📈",
    },
    {
      id: "market",
      name: "Market Trends",
      count: 7,
      color: "orange",
      icon: "🌐",
    },
    {
      id: "legal",
      name: "Legal Advice",
      count: 4,
      color: "red",
      icon: "⚖️",
    },
    {
      id: "design",
      name: "Home Design",
      count: 2,
      color: "pink",
      icon: "🎨",
    },
  ];

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Urban Living: Smart Homes in 2024",
      excerpt:
        "Explore how technology is transforming urban living spaces and what it means for home buyers and investors.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "market",
      author: {
        name: "Sarah Johnson",
        role: "Real Estate Analyst",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      },
      date: "2024-01-15",
      readTime: "8 min read",
      views: 1250,
      comments: 34,
      likes: 89,
      tags: ["smart homes", "technology", "urban living", "future"],
      featured: true,
      trending: true,
      premium: false,
    },
    {
      id: 2,
      title: "Investment Blueprint: Building Wealth Through Real Estate",
      excerpt:
        "A comprehensive guide to creating and managing a profitable real estate investment portfolio from scratch.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "investment",
      author: {
        name: "Mike Chen",
        role: "Investment Strategist",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      },
      date: "2024-01-12",
      readTime: "12 min read",
      views: 890,
      comments: 21,
      likes: 67,
      tags: ["investment", "wealth building", "portfolio", "strategies"],
      featured: true,
      trending: true,
      premium: true,
    },
    {
      id: 3,
      title: "The Psychology of Home Buying: What Drives Our Decisions",
      excerpt:
        "Understanding the emotional and psychological factors that influence home buying decisions in today's market.",
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "buying",
      author: {
        name: "Dr. Emily Roberts",
        role: "Behavioral Psychologist",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      },
      date: "2024-01-10",
      readTime: "10 min read",
      views: 1560,
      comments: 45,
      likes: 112,
      tags: ["psychology", "decision making", "buyer behavior", "market"],
      featured: true,
      trending: false,
      premium: false,
    },
    {
      id: 4,
      title: "Sustainable Living: Eco-Friendly Homes That Save Money",
      excerpt:
        "Discover how sustainable home features can reduce your carbon footprint and save thousands in utility costs.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "design",
      author: {
        name: "Lisa Thompson",
        role: "Sustainability Expert",
        avatar:
          "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
      },
      date: "2024-01-08",
      readTime: "7 min read",
      views: 980,
      comments: 18,
      likes: 54,
      tags: [
        "sustainability",
        "eco-friendly",
        "energy efficiency",
        "green homes",
      ],
      featured: false,
      trending: true,
      premium: false,
    },
    {
      id: 5,
      title: "Legal Framework: Navigating Property Laws in 2024",
      excerpt:
        "Essential legal updates and compliance requirements for property transactions in the current regulatory landscape.",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "legal",
      author: {
        name: "Advocate Priya Sharma",
        role: "Property Law Specialist",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      },
      date: "2024-01-05",
      readTime: "15 min read",
      views: 1120,
      comments: 29,
      likes: 43,
      tags: ["legal", "property law", "compliance", "regulations"],
      featured: false,
      trending: false,
      premium: true,
    },
    {
      id: 6,
      title: "The Art of Negotiation: Getting the Best Deal on Your Dream Home",
      excerpt:
        "Master negotiation strategies used by top real estate agents to secure the best possible price for your property.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "buying",
      author: {
        name: "David Wilson",
        role: "Negotiation Coach",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      date: "2024-01-03",
      readTime: "9 min read",
      views: 1340,
      comments: 32,
      likes: 78,
      tags: ["negotiation", "buying strategy", "real estate deals", "pricing"],
      featured: false,
      trending: true,
      premium: false,
    },
  ];

  // Experts data
  const experts = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Market Analyst",
      expertise: "Urban Development & Smart Cities",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      articles: 24,
      experience: "8 years",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Investment Strategist",
      expertise: "Portfolio Management & ROI Optimization",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      articles: 18,
      experience: "12 years",
    },
    {
      id: 3,
      name: "Dr. Emily Roberts",
      role: "Behavioral Psychologist",
      expertise: "Buyer Psychology & Decision Making",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      articles: 15,
      experience: "6 years",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const trendingPosts = blogPosts.filter((post) => post.trending);

  return (
    <>
      <Helmet>
        <title>Makaan4U Insights - Real Estate Knowledge Hub</title>
        <meta
          name="description"
          content="Expert real estate insights, market analysis, investment strategies, and home buying guides from industry professionals."
        />
        <meta
          name="keywords"
          content="real estate blog, property insights, market trends, investment strategies, home buying guide"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          <BlogHero
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearch}
            totalArticles={blogPosts.length}
          />

          <StatsOverview posts={blogPosts} />

          <CategoryFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            currentView={currentView}
            onViewChange={setCurrentView}
          />

          <FeaturedStories posts={featuredPosts} />

          {/* Main Content Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
              {/* Blog Posts - Main Content */}
              <div className="lg:col-span-3">
                <BlogShowcase posts={filteredPosts} currentView={currentView} />
              </div>

              {/* Sidebar */}
              <div className="space-y-6 md:space-y-8">
                <TrendingTopics posts={trendingPosts} />
                <ExpertSpotlight experts={experts} />
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingChat isOpen={isChatOpen} onToggle={handleChatToggle} />
      </div>
    </>
  );
};

export default Blog;