import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Building2,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  LogIn,
  Shield,
  Key,
  Heart,
  FileText,
  Info,
} from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import {
  logout,
  getStoredUser,
  clearAuthData,
} from "../../lib/mongo/services/authService";
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
} from "../../lib/mongo/services/notificationService";
import { toast } from "react-toastify";

const Header = ({ onSearch }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  // MINIMAL navigation items - Only Blog and About for SEO
  const getNavigationItems = () => {
    const baseItems = [
      { label: "Home", path: "/home-page", icon: Home, public: true },
      {
        label: "Properties",
        path: "/property-listings?sort=relevance&view=grid&map=false",
        icon: Building2,
        public: true,
      },
    ];

    // SEO PAGES ONLY
    const seoItems = [
      {
        label: "Blog",
        path: "/blog",
        icon: FileText,
        public: true,
      },
      {
        label: "About",
        path: "/about",
        icon: Info,
        public: true,
      },
    ];

    const authItems = [];

    const agentItems = [
      {
        label: "Agent Dashboard",
        path: "/agent/dashboard",
        icon: Shield,
        requiresAuth: true,
        agentOnly: true,
      },
    ];

    const adminItems = [
      {
        label: "Admin Dashboard",
        path: "/admin",
        icon: Shield,
        requiresAuth: true,
        adminOnly: true,
      },
    ];

    return [
      ...baseItems,
      ...seoItems,
      ...authItems,
      ...agentItems,
      ...adminItems,
    ];
  };

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      if (data.success) {
        setNotifications(data.notifications || []);
        setNotificationCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Failed to load notifications", error);
    }
  };

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      loadNotifications();
    }
  }, []);

  const handleNotificationClick = async (notification) => {
    setIsNotificationOpen(false);
    if (!notification.isRead) {
      try {
        await markAsRead(notification._id);
        loadNotifications(); // Refresh unread count
      } catch (error) {
        console.error("Failed to mark as read", error);
      }
    }
    
    if (notification.type === "property") {
      navigate(`/property-listings`);
    } else {
      toast.info(notification.message);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      loadNotifications();
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    if (path === "/admin") {
      navigate("/admin/dashboard");
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      // Navigate to property listings with search query in URL
      const params = new URLSearchParams();
      params.append("search", searchQuery.trim());
      navigate(`/property-listings?${params.toString()}`);

      // Call the onSearch prop if provided
      onSearch?.(searchQuery.trim());

      setIsSearchOpen(false);
      setSearchQuery("");
    } else {
      // Navigate to property listings when search is empty
      navigate("/property-listings");
      setIsSearchOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      clearAuthData();
      setUser(null);
      setIsProfileOpen(false);
      toast.success("Logged out successfully");
      navigate("/home-page");
    } catch (error) {
      console.error("Logout error:", error);
      clearAuthData();
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/home-page");
    }
  };

  const handleLogin = () => {
    navigate("/auth/login");
    setIsMobileMenuOpen(false);
  };

  const getVisibleNavItems = () => {
    const items = getNavigationItems();
    return items.filter((item) => {
      if (item.public) return true;
      if (item.requiresAuth && !user) return false;
      if (item.agentOnly && user?.role !== "agent") return false;
      if (item.adminOnly && user?.role !== "admin") return false;
      return true;
    });
  };

  const isActivePath = (path) => {
    if (path === "/admin") {
      return location.pathname.startsWith("/admin");
    }
    return location.pathname === path;
  };

  const getRoleBadge = () => {
    if (!user) return null;

    const roleConfig = {
      admin: { color: "bg-red-100 text-red-800", label: "Admin" },
      agent: { color: "bg-blue-100 text-blue-800", label: "Agent" },
      customer: { color: "bg-green-100 text-green-800", label: "Customer" },
    };

    const config = roleConfig[user.role] || roleConfig.customer;

    return (
      <span
        className={`px-2 py-1 text-xs rounded-full font-medium ${config.color} whitespace-nowrap`}
      >
        {config.label}
      </span>
    );
  };

  const getProfileMenuItems = () => {
    const baseItems = [
      {
        label: "Profile",
        icon: User,
        path: "/profile",
        onClick: () => navigate("/profile"),
      },
      {
        label: "Favorites",
        icon: Heart,
        path: "/profile/favorites",
        onClick: () => navigate("/profile/favorites"),
      },
    ];

    const agentItems = [
      {
        label: "Agent Dashboard",
        icon: Key,
        path: "/agent/dashboard",
        onClick: () => navigate("/agent/dashboard"),
      },
    ];

    const adminItems = [
      {
        label: "Admin Panel",
        icon: Shield,
        path: "/admin/dashboard",
        onClick: () => navigate("/admin/dashboard"),
      },
    ];

    let menuItems = [...baseItems];

    if (user?.role === "agent") {
      menuItems = [...menuItems, ...agentItems];
    } else if (user?.role === "admin") {
      menuItems = [...menuItems, ...adminItems];
    }

    menuItems.push({
      label: "Settings",
      icon: Settings,
      path: "/profile/settings",
      onClick: () => navigate("/profile/settings"),
    });

    return menuItems;
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md transform-gpu border-b border-gray-200/50 shadow-sm will-change-transform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Left: Logo & Nav */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            {/* Logo */}
            <button
              onClick={() => navigate("/home-page")}
              className="flex items-center space-x-2 transition-all hover:scale-105 group"
            >
              <Logo className="w-8 h-8 group-hover:scale-105 transition-transform duration-300 drop-shadow-md" />
              <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 whitespace-nowrap tracking-tight">
                Makaan4U
              </span>
            </button>

            {/* Desktop Navigation - Clean & Premium */}
            <nav className="hidden lg:flex items-center space-x-0.5 border-l border-gray-200/50 pl-5 h-6">
              {getVisibleNavItems().map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center px-3 py-1.5 text-xs font-semibold transition-all duration-300 rounded-md ${
                    isActivePath(item.path)
                      ? "text-blue-600 bg-blue-50/80"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Center: Search */}
          <div className="hidden lg:flex flex-1 justify-center max-w-lg px-6">
            <form
              onSubmit={handleSearch}
              className="w-full relative flex items-center group"
            >
              <Input
                type="search"
                placeholder="Search properties, cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 h-9 text-xs border-gray-200 focus:border-blue-500 rounded-full shadow-sm bg-gray-50/50 hover:bg-white focus:bg-white transition-all duration-300"
              />
              <Search
                size={16}
                className="absolute left-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
              />
              <Button
                type="submit"
                className="absolute right-1 top-1 h-7 px-4 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-sm transition-all duration-300 border-none"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Search (Mobile Only) */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all"
              >
                <Search size={20} />
              </button>

              {/* Mobile Search Overlay */}
              {isSearchOpen && (
                <div className="lg:hidden fixed top-[72px] left-4 right-4 sm:absolute sm:top-16 sm:-right-2 sm:left-auto sm:w-96 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-xl shadow-2xl p-4 z-50 animate-in slide-in-from-top-2">
                  <form onSubmit={handleSearch} className="relative flex items-center">
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-24 h-12 text-sm border-gray-200 focus:border-blue-500 rounded-md bg-gray-50 focus:bg-white shadow-sm"
                      autoFocus
                    />
                    <Search
                      size={18}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <Button
                      type="submit"
                      className="absolute right-1.5 top-1.5 h-9 px-4 text-xs font-bold uppercase bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm"
                    >
                      Search
                    </Button>
                  </form>
                </div>
              )}
            </div>

            {/* Notifications */}
            {user && (
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative p-2.5 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-md"
                >
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <span className="absolute 2 top-1.5 right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="absolute top-14 right-0 w-80 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                    <div className="p-4 bg-gray-50/80 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-gray-900 text-sm">
                        Notifications
                      </h3>
                      {notificationCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification._id}
                            className={`p-4 border-b border-gray-50 last:border-b-0 transition-colors cursor-pointer group ${
                              !notification.isRead ? "bg-blue-50/30 hover:bg-blue-50/50" : "hover:bg-gray-50"
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                  !notification.isRead
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                                }`}
                              />
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold group-hover:text-blue-600 transition-colors truncate ${
                                  !notification.isRead ? "text-gray-900" : "text-gray-600"
                                }`}>
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">
                                  {notification.message}
                                </p>
                                <p className="text-[10px] font-medium text-gray-400 mt-2 uppercase tracking-wide">
                                  {new Date(notification.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile */}
            {user ? (
              <div className="hidden lg:block relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-md flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>

                {isProfileOpen && (
                  <div className="absolute top-14 right-0 w-64 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-md shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95">
                    <div className="p-5 bg-gray-50/80 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-md flex items-center justify-center shadow-md">
                          <span className="text-lg font-bold text-white">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {user.email}
                          </p>
                          <div className="mt-2">{getRoleBadge()}</div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      {getProfileMenuItems().map((item) => (
                        <button
                          key={item.path}
                          onClick={item.onClick}
                          className="w-full flex items-center space-x-3 px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
                        >
                          <item.icon size={16} className="text-gray-400" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="p-2 border-t border-gray-100 bg-gray-50/50">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={handleLogin}
                  className="h-8 px-4 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border-transparent rounded-md transition-all"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate("/auth/register")}
                  className="h-8 px-4 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm rounded-md transition-all hover:shadow border-none"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay & Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-14 bottom-0 z-[100] transition-opacity">
          {/* Click-outside backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          {/* Menu Drawer (Full Width) */}
          <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-gray-200/50 shadow-2xl z-10 animate-in fade-in slide-in-from-top-2 overflow-hidden">
            <nav className="flex flex-col py-2 px-4 space-y-1 max-h-[60vh] overflow-y-auto">
              {getVisibleNavItems().map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    handleNavigation(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3.5 text-sm font-semibold transition-all rounded-lg ${
                    isActivePath(item.path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={18} className="mr-3 opacity-70" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
              {!user ? (
                <div className="flex flex-col space-y-3">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full h-10 text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/auth/register");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full h-10 text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-sm border-none"
                  >
                    Sign Up
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <div 
                    onClick={() => {
                      navigate("/profile");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-md flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold text-white">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-sm truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full h-11 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border-transparent"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;