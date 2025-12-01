// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Home,
//   Building2,
//   Search,
//   Bell,
//   ChevronDown,
//   User,
//   Settings,
//   LogOut,
//   Menu,
//   X,
//   LogIn,
//   Shield,
//   Key,
//   Heart,
//   FileText,
//   Info,
// } from "lucide-react";
// import Button from "./Button";
// import Input from "./Input";
// import {
//   logout,
//   getStoredUser,
//   clearAuthData,
// } from "../../lib/mongo/services/authService";
// import { toast } from "react-toastify";

// const Header = ({ onSearch }) => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [user, setUser] = useState(null);
//   const [notificationCount, setNotificationCount] = useState(3);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const profileRef = useRef(null);
//   const notificationRef = useRef(null);
//   const searchRef = useRef(null);

//   // MINIMAL navigation items - Only Blog and About for SEO
//   const getNavigationItems = () => {
//     const baseItems = [
//       { label: "Home", path: "/home-page", icon: Home, public: true },
//       {
//         label: "Properties",
//         path: "/property-listings",
//         icon: Building2,
//         public: true,
//       },
//     ];

//     // SEO PAGES ONLY
//     const seoItems = [
//       {
//         label: "Blog",
//         path: "/blog",
//         icon: FileText,
//         public: true,
//       },
//       {
//         label: "About",
//         path: "/about",
//         icon: Info,
//         public: true,
//       },
//     ];

//     const authItems = [];

//     const agentItems = [
//       {
//         label: "Agent Dashboard",
//         path: "/agent/dashboard",
//         icon: Shield,
//         requiresAuth: true,
//         agentOnly: true,
//       },
//     ];

//     const adminItems = [
//       {
//         label: "Admin Dashboard",
//         path: "/admin",
//         icon: Shield,
//         requiresAuth: true,
//         adminOnly: true,
//       },
//     ];

//     return [
//       ...baseItems,
//       ...seoItems,
//       ...authItems,
//       ...agentItems,
//       ...adminItems,
//     ];
//   };

//   // Simple notifications
//   const getNotifications = () => {
//     const baseNotifications = [
//       {
//         id: 1,
//         title: "New Property Match",
//         message: "Property matching your criteria available",
//         time: "1 hour ago",
//         type: "info",
//       },
//     ];

//     const customerNotifications = [
//       {
//         id: 2,
//         title: "Viewing Confirmed",
//         message: "Property viewing scheduled",
//         time: "5 min ago",
//         type: "success",
//       },
//     ];

//     let notifications = [...baseNotifications];

//     if (user?.role === "customer") {
//       notifications = [...notifications, ...customerNotifications];
//     }

//     return notifications;
//   };

//   useEffect(() => {
//     const storedUser = getStoredUser();
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target)
//       ) {
//         setIsNotificationOpen(false);
//       }
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setIsSearchOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleNavigation = (path) => {
//     if (path === "/admin") {
//       navigate("/admin/dashboard");
//     } else {
//       navigate(path);
//     }
//     setIsMobileMenuOpen(false);
//   };

//   const handleSearch = (e) => {
//     e?.preventDefault();
//     if (searchQuery?.trim()) {
//       onSearch?.(searchQuery);
//       navigate("/property-listings", { state: { searchQuery } });
//       setIsSearchOpen(false);
//       setSearchQuery("");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       clearAuthData();
//       setUser(null);
//       setIsProfileOpen(false);
//       toast.success("Logged out successfully");
//       navigate("/home-page");
//     } catch (error) {
//       console.error("Logout error:", error);
//       clearAuthData();
//       setUser(null);
//       toast.success("Logged out successfully");
//       navigate("/home-page");
//     }
//   };

//   const handleLogin = () => {
//     navigate("/auth/login");
//     setIsMobileMenuOpen(false);
//   };

//   const getVisibleNavItems = () => {
//     const items = getNavigationItems();
//     return items.filter((item) => {
//       if (item.public) return true;
//       if (item.requiresAuth && !user) return false;
//       if (item.agentOnly && user?.role !== "agent") return false;
//       if (item.adminOnly && user?.role !== "admin") return false;
//       return true;
//     });
//   };

//   const isActivePath = (path) => {
//     if (path === "/admin") {
//       return location.pathname.startsWith("/admin");
//     }
//     return location.pathname === path;
//   };

//   const getRoleBadge = () => {
//     if (!user) return null;

//     const roleConfig = {
//       admin: { color: "bg-red-100 text-red-800", label: "Admin" },
//       agent: { color: "bg-blue-100 text-blue-800", label: "Agent" },
//       customer: { color: "bg-green-100 text-green-800", label: "Customer" },
//     };

//     const config = roleConfig[user.role] || roleConfig.customer;

//     return (
//       <span
//         className={`px-2 py-1 text-xs rounded-full font-medium ${config.color} whitespace-nowrap`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   const getProfileMenuItems = () => {
//     const baseItems = [
//       {
//         label: "Profile",
//         icon: User,
//         path: "/profile",
//         onClick: () => navigate("/profile"),
//       },
//       {
//         label: "Favorites",
//         icon: Heart,
//         path: "/favorites",
//         onClick: () => navigate("/favorites"),
//       },
//     ];

//     const agentItems = [
//       {
//         label: "Agent Dashboard",
//         icon: Key,
//         path: "/agent/dashboard",
//         onClick: () => navigate("/agent/dashboard"),
//       },
//     ];

//     const adminItems = [
//       {
//         label: "Admin Panel",
//         icon: Shield,
//         path: "/admin/dashboard",
//         onClick: () => navigate("/admin/dashboard"),
//       },
//     ];

//     let menuItems = [...baseItems];

//     if (user?.role === "agent") {
//       menuItems = [...menuItems, ...agentItems];
//     } else if (user?.role === "admin") {
//       menuItems = [...menuItems, ...adminItems];
//     }

//     menuItems.push({
//       label: "Settings",
//       icon: Settings,
//       path: "/settings",
//       onClick: () => navigate("/settings"),
//     });

//     return menuItems;
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
//       <div className="w-full px-4 sm:px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center flex-shrink-0">
//             <button
//               onClick={() => navigate("/home-page")}
//               className="flex items-center space-x-3 transition-all hover:opacity-80"
//             >
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
//                 <Home size={18} color="white" />
//               </div>
//               <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
//                 Makaan4U
//               </span>
//             </button>
//           </div>

//           {/* Desktop Navigation - Clean & Minimal */}
//           <nav className="hidden lg:flex items-center justify-center flex-1 max-w-xl mx-8">
//             <div className="flex items-center space-x-1">
//               {getVisibleNavItems().map((item) => (
//                 <button
//                   key={item.path}
//                   onClick={() => handleNavigation(item.path)}
//                   className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
//                     isActivePath(item.path)
//                       ? "text-blue-600 bg-blue-50 border border-blue-100"
//                       : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                   }`}
//                 >
//                   <item.icon size={18} />
//                   <span>{item.label}</span>
//                 </button>
//               ))}
//             </div>
//           </nav>

//           {/* Right Side Actions */}
//           <div className="flex items-center justify-end space-x-3 flex-shrink-0">
//             {/* Search */}
//             <div className="relative" ref={searchRef}>
//               {/* Mobile Search Icon */}
//               <button
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg"
//               >
//                 <Search size={20} />
//               </button>

//               {/* Desktop Search */}
//               <div className="hidden lg:flex items-center">
//                 <form
//                   onSubmit={handleSearch}
//                   className="flex items-center space-x-3"
//                 >
//                   <div className="relative">
//                     <Input
//                       type="search"
//                       placeholder="Search properties..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-64 pl-10 pr-4 h-10 text-sm border-gray-300 focus:border-blue-300"
//                     />
//                     <Search
//                       size={18}
//                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     />
//                   </div>
//                   <Button
//                     type="submit"
//                     className="h-10 px-4 text-sm bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
//                   >
//                     Search
//                   </Button>
//                 </form>
//               </div>

//               {/* Mobile Search Overlay */}
//               {isSearchOpen && (
//                 <div className="lg:hidden absolute top-12 right-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
//                   <form onSubmit={handleSearch} className="space-y-3">
//                     <div className="relative">
//                       <Input
//                         type="search"
//                         placeholder="Search properties..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full h-11 text-sm pl-10"
//                         autoFocus
//                       />
//                       <Search
//                         size={18}
//                         className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       />
//                     </div>
//                     <Button
//                       type="submit"
//                       className="w-full h-11 text-sm bg-blue-600 hover:bg-blue-700"
//                     >
//                       Search Properties
//                     </Button>
//                   </form>
//                 </div>
//               )}
//             </div>

//             {/* Notifications */}
//             {user && (
//               <div className="relative" ref={notificationRef}>
//                 <button
//                   onClick={() => setIsNotificationOpen(!isNotificationOpen)}
//                   className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg"
//                 >
//                   <Bell size={20} />
//                   {notificationCount > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
//                       {notificationCount}
//                     </span>
//                   )}
//                 </button>

//                 {isNotificationOpen && (
//                   <div className="absolute top-12 right-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
//                     <div className="p-4 border-b border-gray-200">
//                       <h3 className="font-semibold text-gray-900 text-sm">
//                         Notifications
//                       </h3>
//                     </div>
//                     <div className="max-h-64 overflow-y-auto">
//                       {getNotifications().map((notification) => (
//                         <div
//                           key={notification.id}
//                           className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
//                           onClick={() => {
//                             setIsNotificationOpen(false);
//                             toast.info(`Opening: ${notification.title}`);
//                           }}
//                         >
//                           <div className="flex items-start space-x-3">
//                             <div
//                               className={`w-2 h-2 rounded-full mt-2 ${
//                                 notification.type === "success"
//                                   ? "bg-green-500"
//                                   : "bg-blue-500"
//                               }`}
//                             />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-medium text-gray-900 truncate">
//                                 {notification.title}
//                               </p>
//                               <p className="text-sm text-gray-600 mt-1">
//                                 {notification.message}
//                               </p>
//                               <p className="text-xs text-gray-500 mt-2">
//                                 {notification.time}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* User Profile */}
//             {user ? (
//               <div className="relative" ref={profileRef}>
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
//                     <span className="text-sm font-medium text-white">
//                       {user.name?.charAt(0)?.toUpperCase() || "U"}
//                     </span>
//                   </div>
//                   <ChevronDown
//                     size={16}
//                     className="text-gray-600 hidden sm:block"
//                   />
//                 </button>

//                 {isProfileOpen && (
//                   <div className="absolute top-12 right-0 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
//                     <div className="p-4 border-b border-gray-200">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
//                           <span className="text-sm font-medium text-white">
//                             {user.name?.charAt(0)?.toUpperCase() || "U"}
//                           </span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="font-semibold text-gray-900 text-sm truncate">
//                             {user.name}
//                           </p>
//                           <p className="text-sm text-gray-600 mt-1 truncate">
//                             {user.email}
//                           </p>
//                         </div>
//                         {getRoleBadge()}
//                       </div>
//                     </div>

//                     <div className="py-2">
//                       {getProfileMenuItems().map((item) => (
//                         <button
//                           key={item.path}
//                           onClick={item.onClick}
//                           className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                         >
//                           <item.icon size={18} />
//                           <span>{item.label}</span>
//                         </button>
//                       ))}
//                     </div>

//                     <div className="p-2 border-t border-gray-200">
//                       <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                       >
//                         <LogOut size={18} />
//                         <span>Sign Out</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="hidden lg:flex items-center space-x-3">
//                 <Button
//                   variant="ghost"
//                   onClick={handleLogin}
//                   className="h-10 px-4 text-sm text-gray-700 hover:text-gray-900 border border-gray-300"
//                 >
//                   Sign In
//                 </Button>
//                 <Button
//                   onClick={() => navigate("/auth/register")}
//                   className="h-10 px-4 text-sm bg-blue-600 hover:bg-blue-700"
//                 >
//                   Sign Up
//                 </Button>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg"
//             >
//               {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="lg:hidden border-t border-gray-200 bg-white">
//             <nav className="py-4 space-y-2">
//               {getVisibleNavItems().map((item) => (
//                 <button
//                   key={item.path}
//                   onClick={() => handleNavigation(item.path)}
//                   className={`w-full flex items-center space-x-3 px-4 py-3.5 text-base font-medium transition-colors rounded-lg mx-2 ${
//                     isActivePath(item.path)
//                       ? "text-blue-600 bg-blue-50 border border-blue-100"
//                       : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                   }`}
//                 >
//                   <item.icon size={20} />
//                   <span>{item.label}</span>
//                 </button>
//               ))}

//               {/* Mobile Login */}
//               {!user && (
//                 <div className="px-4 py-3 border-t border-gray-200">
//                   <div className="flex space-x-3">
//                     <Button
//                       variant="ghost"
//                       onClick={handleLogin}
//                       className="flex-1 h-12 text-sm text-gray-700 hover:text-gray-900 border border-gray-300"
//                     >
//                       Sign In
//                     </Button>
//                     <Button
//                       onClick={() => navigate("/auth/register")}
//                       className="flex-1 h-12 text-sm bg-blue-600 hover:bg-blue-700"
//                     >
//                       Sign Up
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               {/* User Info */}
//               {user && (
//                 <div className="px-4 py-4 border-t border-gray-200">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
//                       <span className="text-base font-medium text-white">
//                         {user.name?.charAt(0)?.toUpperCase() || "U"}
//                       </span>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-semibold text-gray-900 text-base truncate">
//                         {user.name}
//                       </p>
//                       <p className="text-sm text-gray-600 truncate">
//                         {user.email}
//                       </p>
//                     </div>
//                     {getRoleBadge()}
//                   </div>
//                 </div>
//               )}

//               {/* Mobile Logout */}
//               {user && (
//                 <div className="px-4 py-3 border-t border-gray-200">
//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center justify-center space-x-2 px-4 py-3.5 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                   >
//                     <LogOut size={20} />
//                     <span>Sign Out</span>
//                   </button>
//                 </div>
//               )}
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
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
  LogIn,
  Shield,
  Key,
  Heart,
  FileText,
  Info,
} from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import {
  logout,
  getStoredUser,
  clearAuthData,
} from "../../lib/mongo/services/authService";
import { toast } from "react-toastify";

const Header = ({ onSearch }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);

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

  // Simple notifications
  const getNotifications = () => {
    const baseNotifications = [
      {
        id: 1,
        title: "New Property Match",
        message: "Property matching your criteria available",
        time: "1 hour ago",
        type: "info",
      },
    ];

    const customerNotifications = [
      {
        id: 2,
        title: "Viewing Confirmed",
        message: "Property viewing scheduled",
        time: "5 min ago",
        type: "success",
      },
    ];

    let notifications = [...baseNotifications];

    if (user?.role === "customer") {
      notifications = [...notifications, ...customerNotifications];
    }

    return notifications;
  };

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => navigate("/home-page")}
              className="flex items-center space-x-3 transition-all hover:opacity-80"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                <Home size={18} color="white" />
              </div>
              <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
                Makaan4U
              </span>
            </button>
          </div>

          {/* Desktop Navigation - Clean & Minimal */}
          <nav className="hidden lg:flex items-center justify-center flex-1 max-w-xl mx-8">
            <div className="flex items-center space-x-1">
              {getVisibleNavItems().map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActivePath(item.path)
                      ? "text-blue-600 bg-blue-50 border border-blue-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center justify-end space-x-3 flex-shrink-0">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              {/* Mobile Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg"
              >
                <Search size={20} />
              </button>

              {/* Desktop Search */}
              <div className="hidden lg:flex items-center">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center space-x-2"
                >
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search properties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 pl-10 pr-4 h-10 text-sm border-gray-300 focus:border-blue-300 rounded-lg"
                    />
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-10 px-4 text-sm bg-blue-600 hover:bg-blue-700 whitespace-nowrap rounded-lg"
                  >
                    Search
                  </Button>
                </form>
              </div>

              {/* Mobile Search Overlay */}
              {isSearchOpen && (
                <div className="lg:hidden absolute top-12 right-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
                  <form onSubmit={handleSearch} className="space-y-3">
                    <div className="relative">
                      <Input
                        type="search"
                        placeholder="Search properties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 text-sm pl-10 rounded-lg"
                        autoFocus
                      />
                      <Search
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-11 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                      Search Properties
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
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg"
                >
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="absolute top-12 right-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {getNotifications().map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => {
                            setIsNotificationOpen(false);
                            toast.info(`Opening: ${notification.title}`);
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === "success"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-sm font-medium text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className="text-gray-600 hidden sm:block"
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute top-12 right-0 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-sm font-medium text-white">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-600 mt-1 truncate">
                            {user.email}
                          </p>
                        </div>
                        {getRoleBadge()}
                      </div>
                    </div>

                    <div className="py-2">
                      {getProfileMenuItems().map((item) => (
                        <button
                          key={item.path}
                          onClick={item.onClick}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <item.icon size={18} />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="p-2 border-t border-gray-200">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={handleLogin}
                  className="h-10 px-4 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate("/auth/register")}
                  className="h-10 px-4 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="py-4 space-y-2">
              {getVisibleNavItems().map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3.5 text-base font-medium transition-colors rounded-lg mx-2 ${
                    isActivePath(item.path)
                      ? "text-blue-600 bg-blue-50 border border-blue-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}

              {/* Mobile Login */}
              {!user && (
                <div className="px-4 py-3 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <Button
                      variant="ghost"
                      onClick={handleLogin}
                      className="flex-1 h-12 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => navigate("/auth/register")}
                      className="flex-1 h-12 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              )}

              {/* User Info */}
              {user && (
                <div className="px-4 py-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-base font-medium text-white">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-base truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {user.email}
                      </p>
                    </div>
                    {getRoleBadge()}
                  </div>
                </div>
              )}

              {/* Mobile Logout */}
              {user && (
                <div className="px-4 py-3 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3.5 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;