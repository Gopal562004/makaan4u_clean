import React, { createContext, useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Footer from "../home-page/components/Footer";
import FloatingChat from "../../components/ui/FloatingChat";
import ProfileSidebar from "./components/ProfileSidebar";
import {
  getMe,
  updateProfile,
  updateAvatar,
  logout,
  getStoredUser,
  isAuthenticated,
} from "../../lib/mongo/services/authService";

// Create a context
const ProfileContext = createContext();

// Custom hook to use profile context
export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileLayout");
  }
  return context;
};

// Helper function to get user initials
const getUserInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 1);
};

// Helper function to check if avatar URL is valid
const isValidAvatar = (avatar) => {
  return (
    avatar && avatar.startsWith("http") && !avatar.includes("default-avatar")
  );
};

const ProfileLayout = () => {1
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Check if user is authenticated
        if (!isAuthenticated()) {
          navigate("/login");
          return;
        }

        // Try to get user data from API
        const userData = await getMe();
        setUser(userData.user || userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load profile data");

        // Fallback to stored user data
        const storedUser = getStoredUser();
        if (storedUser) {
          setUser(storedUser);
        } else {
          // If no stored user, redirect to login
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Update user function that syncs with API
  const updateUser = async (updatedData) => {
    try {
      setLoading(true);

      // Update via API
      const response = await updateProfile(updatedData);
      const updatedUser = response.user || response;

      // Update local state
      setUser(updatedUser);

      // Update localStorage
      const currentUser = getStoredUser();
      const mergedUser = { ...currentUser, ...updatedUser };
      localStorage.setItem("user", JSON.stringify(mergedUser));

      return updatedUser;
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update avatar function
  const updateUserAvatar = async (avatarFile) => {
    try {
      setLoading(true);
      const response = await updateAvatar(avatarFile);
      const updatedUser = response.user || response;

      // Update local state
      setUser(updatedUser);

      // Update localStorage
      const currentUser = getStoredUser();
      const mergedUser = { ...currentUser, ...updatedUser };
      localStorage.setItem("user", JSON.stringify(mergedUser));

      return updatedUser;
    } catch (error) {
      console.error("Error updating avatar:", error);
      setError("Failed to update avatar");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
      // Still clear local data even if API call fails
    } finally {
      // Clear all local data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    }
  };

  // Determine active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("favorites")) setActiveTab("favorites");
    else if (path.includes("settings")) setActiveTab("settings");
    else setActiveTab("profile");
  }, [location]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "favorites", label: "Favorites", icon: "❤️" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  // Show loading state
  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Profile
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProfileContext.Provider
      value={{
        user,
        onUserUpdate: updateUser,
        onAvatarUpdate: updateUserAvatar,
        activeTab,
        loading,
        error,
        setError,
        getUserInitials,
        isValidAvatar,
      }}
    >
      <Helmet>
        <title>My Profile - Makaan4U</title>
        <meta
          name="description"
          content="Manage your Makaan4U profile, favorites, and settings"
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
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

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Mobile Header */}
            <div className="lg:hidden mb-6">
              <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600 mt-1">
                Manage your profile and preferences
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar */}
              <div className="lg:w-64">
                <ProfileSidebar
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  tabs={tabs}
                  user={user}
                  onLogout={handleLogout}
                  getUserInitials={getUserInitials}
                  isValidAvatar={isValidAvatar}
                />
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {loading && (
                  <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}
                <Outlet />
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingChat isOpen={isChatOpen} onToggle={handleChatToggle} />
      </div>
    </ProfileContext.Provider>
  );
};

export default ProfileLayout;
