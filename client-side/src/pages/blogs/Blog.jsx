import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import Footer from "../../pages/home-page/components/Footer";
import FloatingChat from "../../components/ui/FloatingChat";
import BlogHero from "./components/BlogHero";
import FeaturedStories from "./components/FeaturedStories";
import BlogShowcase from "./components/BlogShowcase";
import { getApiUrl } from "../../utils/getApiUrl";

const Blog = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("grid");

  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Use the API base URL from environment config
        const response = await fetch(`${getApiUrl()}/news`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setBlogPosts(data.data);
        } else {
          setError(data.message || "Failed to fetch news.");
        }
      } catch (err) {
        console.error("News fetch error:", err);
        setError("Error connecting to server. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags || []).some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSearch;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);

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
        <main className="pt-16 pb-16 bg-gray-50">
          {/* Elegant Intro Section (About Page Theme) */}
          <section className="relative flex flex-col items-center justify-center overflow-hidden pt-12 pb-8 sm:pb-10 bg-white border-b border-gray-100">
            {/* Subtle Gradient Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 transform translate-x-1/3 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10 transform -translate-x-1/3 translate-y-1/2"></div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                The Future of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                  Property
                </span>
              </h1>

              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 tracking-tight">
                Redefining Real Estate in India
              </h2>

              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                Where cutting-edge technology meets human expertise to create meaningful connections between people and their perfect spaces.
              </p>
            </div>
          </section>

          {loading ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
              <div className="animate-pulse space-y-8">
                <div className="h-64 bg-gray-200 rounded-2xl w-full"></div>
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="h-48 bg-gray-200 rounded-xl w-full"></div>
                  <div className="h-48 bg-gray-200 rounded-xl w-full"></div>
                  <div className="h-48 bg-gray-200 rounded-xl w-full"></div>
                </div>
                <p className="text-gray-500 font-medium">Fetching latest real estate news...</p>
              </div>
            </div>
          ) : error ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
              <div className="bg-red-50 text-red-600 p-8 rounded-2xl border border-red-100">
                <h3 className="text-xl font-bold mb-2">Oops!</h3>
                <p>{error}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {featuredPosts.length > 0 && (
                <div className="px-0 sm:px-0">
                  <FeaturedStories posts={featuredPosts} />
                </div>
              )}

              {/* Main Content Grid */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Full Width Blog Showcase */}
                <BlogShowcase posts={filteredPosts} currentView={currentView} />
              </div>
            </div>
          )}
        </main>

        <Footer />
        <FloatingChat isOpen={isChatOpen} onToggle={handleChatToggle} />
      </div>
    </>
  );
};

export default Blog;