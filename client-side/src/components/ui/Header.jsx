// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Home,
//   Building2,
//   Calendar,
//   LayoutDashboard,
//   BarChart3,
//   Search,
//   Bell,
//   ChevronDown,
//   User,
//   Globe,
//   Settings,
//   LogOut,
//   Menu,
//   X,
//   LogIn,
//   Users,
//   FileText,
//   Shield,
//   Key,
//   MessageSquare,
//   Heart,
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
//   const [isLanguageOpen, setIsLanguageOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [language, setLanguage] = useState("en");
//   const [user, setUser] = useState(null);
//   const [notificationCount, setNotificationCount] = useState(3);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const profileRef = useRef(null);
//   const notificationRef = useRef(null);
//   const searchRef = useRef(null);
//   const languageRef = useRef(null);

//   // Role-based navigation items
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

//     const authItems = [
//       {
//         label: "Appointments",
//         path: "/appointment-management",
//         icon: Calendar,
//         requiresAuth: true,
//       },
//     ];

//     const agentItems = [
//       {
//         label: "Agent Dashboard",
//         path: "/agent/dashboard",
//         icon: LayoutDashboard,
//         requiresAuth: true,
//         agentOnly: true,
//       },
//       {
//         label: "My Properties",
//         path: "/agent/properties",
//         icon: Building2,
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

//     return [...baseItems, ...authItems, ...agentItems, ...adminItems];
//   };

//   // Role-based notifications
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
//         message: "Luxury Villa viewing tomorrow at 2 PM",
//         time: "5 min ago",
//         type: "success",
//       },
//       {
//         id: 3,
//         title: "Price Drop",
//         message: "A property you liked has reduced price",
//         time: "2 hours ago",
//         type: "info",
//       },
//     ];

//     const agentNotifications = [
//       {
//         id: 4,
//         title: "New Inquiry",
//         message: "Someone inquired about your property",
//         time: "30 min ago",
//         type: "info",
//       },
//       {
//         id: 5,
//         title: "Appointment Request",
//         message: "New viewing request for Modern Apartment",
//         time: "1 hour ago",
//         type: "warning",
//       },
//     ];

//     const adminNotifications = [
//       {
//         id: 6,
//         title: "New User Registration",
//         message: "A new agent has registered",
//         time: "2 hours ago",
//         type: "info",
//       },
//       {
//         id: 7,
//         title: "System Alert",
//         message: "High traffic detected on property listings",
//         time: "3 hours ago",
//         type: "warning",
//       },
//     ];

//     let notifications = [...baseNotifications];

//     if (user?.role === "customer") {
//       notifications = [...notifications, ...customerNotifications];
//     } else if (user?.role === "agent") {
//       notifications = [...notifications, ...agentNotifications];
//     } else if (user?.role === "admin") {
//       notifications = [...notifications, ...adminNotifications];
//     }

//     return notifications;
//   };

//   const languages = [
//     { code: "en", label: "English" },
//     { code: "hi", label: "हिंदी" },
//     { code: "mr", label: "मराठी" },
//   ];

//   useEffect(() => {
//     // Load user from localStorage or context
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
//       if (languageRef.current && !languageRef.current.contains(event.target)) {
//         setIsLanguageOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("language");
//     if (savedLanguage) {
//       setLanguage(savedLanguage);
//     }
//   }, []);

//   const handleNavigation = (path) => {
//     // For admin dashboard, navigate to the main dashboard
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

//   const handleLanguageChange = (langCode) => {
//     setLanguage(langCode);
//     localStorage.setItem("language", langCode);
//     setIsLanguageOpen(false);
//     toast.info(
//       `Language changed to ${languages.find((l) => l.code === langCode)?.label}`
//     );
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
//       // Force logout even if API call fails
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
//       // Public items are always visible
//       if (item.public) return true;

//       // Auth required items
//       if (item.requiresAuth && !user) return false;

//       // Role-specific items
//       if (item.agentOnly && user?.role !== "agent") return false;
//       if (item.adminOnly && user?.role !== "admin") return false;

//       return true;
//     });
//   };

//   // Updated isActivePath function to handle admin routes
//   const isActivePath = (path) => {
//     // For admin routes, check if current path starts with /admin
//     if (path === "/admin") {
//       return location.pathname.startsWith("/admin");
//     }
//     // For other routes, use exact match
//     return location.pathname === path;
//   };

//   const getCurrentLanguage = () => {
//     return languages.find((lang) => lang.code === language)?.label || "English";
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
//         className={`px-2 py-1 text-xs rounded-full font-medium ${config.color}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   const getProfileMenuItems = () => {
//     const baseItems = [
//       {
//         label: "Profile Settings",
//         icon: User,
//         path: "/profile",
//         onClick: () => navigate("/profile"),
//       },
//       {
//         label: "Account Settings",
//         icon: Settings,
//         path: "/account",
//         onClick: () => navigate("/account"),
//       },
//     ];

//     const agentItems = [
//       {
//         label: "Agent Portal",
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

//     return menuItems;
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
//       <div className="w-full px-4 lg:px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <button
//               onClick={() => navigate("/home-page")}
//               className="flex items-center space-x-2 transition-all hover:opacity-80"
//             >
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
//                 <Home size={18} color="white" />
//               </div>
//               <span className="text-lg font-bold text-slate-900">Makaan4U</span>
//             </button>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-1">
//             {getVisibleNavItems().map((item) => (
//               <button
//                 key={item.path}
//                 onClick={() => handleNavigation(item.path)}
//                 className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   isActivePath(item.path)
//                     ? "text-blue-600 bg-blue-50 border border-blue-100"
//                     : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
//                 }`}
//               >
//                 <item.icon size={16} />
//                 <span>{item.label}</span>
//               </button>
//             ))}

//             {/* Login Button in Navigation for Desktop */}
//             {!user && (
//               <button
//                 onClick={handleLogin}
//                 className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
//               >
//                 <LogIn size={16} />
//                 <span>Login</span>
//               </button>
//             )}
//           </nav>

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-3">
//             {/* Search */}
//             <div className="relative" ref={searchRef}>
//               <button
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
//               >
//                 <Search size={18} />
//               </button>

//               <div className="hidden lg:block">
//                 <form onSubmit={handleSearch} className="relative">
//                   <Input
//                     type="search"
//                     placeholder="Search properties..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-64 pl-10 h-9 text-sm border-slate-300 focus:border-blue-300"
//                   />
//                   <Search
//                     size={16}
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
//                   />
//                 </form>
//               </div>

//               {/* Mobile Search Overlay */}
//               {isSearchOpen && (
//                 <div className="lg:hidden absolute top-12 right-0 w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-50">
//                   <form onSubmit={handleSearch}>
//                     <Input
//                       type="search"
//                       placeholder="Search properties..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full h-9 text-sm"
//                       autoFocus
//                     />
//                     <Button
//                       type="submit"
//                       className="w-full mt-3 h-9 text-sm bg-blue-600 hover:bg-blue-700"
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
//                   className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors hover:bg-slate-100 rounded-lg"
//                 >
//                   <Bell size={18} />
//                   {notificationCount > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
//                       {notificationCount > 9 ? "9+" : notificationCount}
//                     </span>
//                   )}
//                 </button>

//                 {isNotificationOpen && (
//                   <div className="absolute top-12 right-0 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
//                     <div className="p-4 border-b border-slate-200">
//                       <h3 className="font-semibold text-slate-900 text-sm">
//                         Notifications ({getNotifications().length})
//                       </h3>
//                     </div>
//                     <div className="max-h-64 overflow-y-auto">
//                       {getNotifications().map((notification) => (
//                         <div
//                           key={notification.id}
//                           className="p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors cursor-pointer"
//                           onClick={() => {
//                             setIsNotificationOpen(false);
//                             // Handle notification click based on type
//                             toast.info(`Opening: ${notification.title}`);
//                           }}
//                         >
//                           <div className="flex items-start space-x-3">
//                             <div
//                               className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
//                                 notification.type === "success"
//                                   ? "bg-green-500"
//                                   : notification.type === "warning"
//                                   ? "bg-yellow-500"
//                                   : "bg-blue-500"
//                               }`}
//                             />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-medium text-slate-900">
//                                 {notification.title}
//                               </p>
//                               <p className="text-sm text-slate-600 mt-1">
//                                 {notification.message}
//                               </p>
//                               <p className="text-xs text-slate-500 mt-2">
//                                 {notification.time}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="p-3 border-t border-slate-200">
//                       <Button
//                         variant="ghost"
//                         className="w-full text-sm h-9"
//                         onClick={() => {
//                           setIsNotificationOpen(false);
//                           navigate("/notifications");
//                         }}
//                       >
//                         View All Notifications
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Language Selector */}
//             <div className="relative hidden lg:block" ref={languageRef}>
//               <button
//                 onClick={() => setIsLanguageOpen(!isLanguageOpen)}
//                 className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
//               >
//                 <Globe size={16} />
//                 <span className="max-w-20 truncate">
//                   {getCurrentLanguage()}
//                 </span>
//                 <ChevronDown size={14} className="text-slate-400" />
//               </button>

//               {isLanguageOpen && (
//                 <div className="absolute top-12 right-0 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
//                   <div className="p-2">
//                     {languages.map((lang) => (
//                       <button
//                         key={lang.code}
//                         onClick={() => handleLanguageChange(lang.code)}
//                         className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
//                           language === lang.code
//                             ? "text-blue-600 bg-blue-50 font-medium"
//                             : "text-slate-700 hover:bg-slate-100"
//                         }`}
//                       >
//                         <span className="flex-1 text-left">{lang.label}</span>
//                         {language === lang.code && (
//                           <div className="w-2 h-2 bg-blue-600 rounded-full" />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* User Profile */}
//             {user ? (
//               <div className="relative" ref={profileRef}>
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
//                 >
//                   <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
//                     <span className="text-sm font-medium text-white">
//                       {user.name?.charAt(0)?.toUpperCase() || "U"}
//                     </span>
//                   </div>
//                   <ChevronDown size={14} className="text-slate-600" />
//                 </button>

//                 {isProfileOpen && (
//                   <div className="absolute top-12 right-0 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
//                     <div className="p-4 border-b border-slate-200">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-semibold text-slate-900 text-sm">
//                             {user.name}
//                           </p>
//                           <p className="text-sm text-slate-600 mt-1">
//                             {user.email}
//                           </p>
//                         </div>
//                         {getRoleBadge()}
//                       </div>
//                     </div>

//                     <div className="p-2">
//                       {getProfileMenuItems().map((item) => (
//                         <button
//                           key={item.path}
//                           onClick={item.onClick}
//                           className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
//                         >
//                           <item.icon size={16} />
//                           <span>{item.label}</span>
//                         </button>
//                       ))}
//                     </div>

//                     <div className="p-2 border-t border-slate-200">
//                       <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                       >
//                         <LogOut size={16} />
//                         <span>Sign Out</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="hidden lg:flex items-center space-x-2">
//                 <Button
//                   variant="ghost"
//                   onClick={handleLogin}
//                   className="h-9 text-sm text-slate-700 hover:text-slate-900"
//                 >
//                   Sign In
//                 </Button>
//                 <Button
//                   onClick={() => navigate("/auth/register")}
//                   className="h-9 text-sm bg-blue-600 hover:bg-blue-700"
//                 >
//                   Sign Up
//                 </Button>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors hover:bg-slate-100 rounded-lg"
//             >
//               {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="lg:hidden border-t border-slate-200 bg-white">
//             <nav className="py-3 space-y-1">
//               {getVisibleNavItems().map((item) => (
//                 <button
//                   key={item.path}
//                   onClick={() => handleNavigation(item.path)}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg mx-2 ${
//                     isActivePath(item.path)
//                       ? "text-blue-600 bg-blue-50 border border-blue-100"
//                       : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
//                   }`}
//                 >
//                   <item.icon size={16} />
//                   <span>{item.label}</span>
//                 </button>
//               ))}

//               {/* Mobile Login Button */}
//               {!user && (
//                 <button
//                   onClick={handleLogin}
//                   className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg mx-2 transition-colors"
//                 >
//                   <LogIn size={16} />
//                   <span>Login</span>
//                 </button>
//               )}

//               {/* User Info in Mobile Menu */}
//               {user && (
//                 <div className="px-4 py-3 border-t border-slate-200">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
//                       <span className="text-sm font-medium text-white">
//                         {user.name?.charAt(0)?.toUpperCase() || "U"}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="font-semibold text-slate-900 text-sm">
//                         {user.name}
//                       </p>
//                       <p className="text-xs text-slate-600">{user.email}</p>
//                     </div>
//                     {getRoleBadge()}
//                   </div>
//                 </div>
//               )}

//               {/* Mobile Language Selector */}
//               <div className="px-4 py-3 border-t border-slate-200">
//                 <div className="flex items-center space-x-3 text-sm text-slate-600 mb-2">
//                   <Globe size={16} />
//                   <span>Language: {getCurrentLanguage()}</span>
//                 </div>
//                 <div className="flex space-x-2">
//                   {languages.map((lang) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => handleLanguageChange(lang.code)}
//                       className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
//                         language === lang.code
//                           ? "bg-blue-600 text-white border-blue-600"
//                           : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
//                       }`}
//                     >
//                       {lang.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Mobile Logout Button */}
//               {user && (
//                 <div className="px-4 pt-3 border-t border-slate-200">
//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                   >
//                     <LogOut size={16} />
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
  Calendar,
  LayoutDashboard,
  BarChart3,
  Search,
  Bell,
  ChevronDown,
  User,
  Globe,
  Settings,
  LogOut,
  Menu,
  X,
  LogIn,
  Users,
  FileText,
  Shield,
  Key,
  MessageSquare,
  Heart,
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
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("en");
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);

  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const languageRef = useRef(null);

  // Role-based navigation items
  const getNavigationItems = () => {
    const baseItems = [
      { label: "Home", path: "/home-page", icon: Home, public: true },
      {
        label: "Properties",
        path: "/property-listings",
        icon: Building2,
        public: true,
      },
    ];

    const authItems = [
      
    ];

    const agentItems = [
      {
        label: "Agent Dashboard",
        path: "/agent/dashboard",
        icon: LayoutDashboard,
        requiresAuth: true,
        agentOnly: true,
      },
      {
        label: "My Properties",
        path: "/agent/properties",
        icon: Building2,
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

    return [...baseItems, ...authItems, ...agentItems, ...adminItems];
  };

  // Role-based notifications
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
        message: "Luxury Villa viewing tomorrow at 2 PM",
        time: "5 min ago",
        type: "success",
      },
      {
        id: 3,
        title: "Price Drop",
        message: "A property you liked has reduced price",
        time: "2 hours ago",
        type: "info",
      },
    ];

    const agentNotifications = [
      {
        id: 4,
        title: "New Inquiry",
        message: "Someone inquired about your property",
        time: "30 min ago",
        type: "info",
      },
      {
        id: 5,
        title: "Appointment Request",
        message: "New viewing request for Modern Apartment",
        time: "1 hour ago",
        type: "warning",
      },
    ];

    const adminNotifications = [
      {
        id: 6,
        title: "New User Registration",
        message: "A new agent has registered",
        time: "2 hours ago",
        type: "info",
      },
      {
        id: 7,
        title: "System Alert",
        message: "High traffic detected on property listings",
        time: "3 hours ago",
        type: "warning",
      },
    ];

    let notifications = [...baseNotifications];

    if (user?.role === "customer") {
      notifications = [...notifications, ...customerNotifications];
    } else if (user?.role === "agent") {
      notifications = [...notifications, ...agentNotifications];
    } else if (user?.role === "admin") {
      notifications = [...notifications, ...adminNotifications];
    }

    return notifications;
  };

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "mr", label: "मराठी" },
  ];

  useEffect(() => {
    // Load user from localStorage or context
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
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleNavigation = (path) => {
    // For admin dashboard, navigate to the main dashboard
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
      onSearch?.(searchQuery);
      navigate("/property-listings", { state: { searchQuery } });
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem("language", langCode);
    setIsLanguageOpen(false);
    toast.info(
      `Language changed to ${languages.find((l) => l.code === langCode)?.label}`
    );
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
      // Force logout even if API call fails
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
      // Public items are always visible
      if (item.public) return true;

      // Auth required items
      if (item.requiresAuth && !user) return false;

      // Role-specific items
      if (item.agentOnly && user?.role !== "agent") return false;
      if (item.adminOnly && user?.role !== "admin") return false;

      return true;
    });
  };

  // Updated isActivePath function to handle admin routes
  const isActivePath = (path) => {
    // For admin routes, check if current path starts with /admin
    if (path === "/admin") {
      return location.pathname.startsWith("/admin");
    }
    // For other routes, use exact match
    return location.pathname === path;
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === language)?.label || "English";
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
        label: "Profile Settings",
        icon: User,
        path: "/profile",
        onClick: () => navigate("/profile"),
      },
      {
        label: "Account Settings",
        icon: Settings,
        path: "/account",
        onClick: () => navigate("/account"),
      },
    ];

    const agentItems = [
      {
        label: "Agent Portal",
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

    return menuItems;
  };

  // Truncate long text with ellipsis
  const truncateText = (text, maxLength = 20) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="w-full px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => navigate("/home-page")}
              className="flex items-center space-x-2 transition-all hover:opacity-80"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                <Home size={16} className="sm:w-18" color="white" />
              </div>
              <span className="text-base sm:text-lg font-bold text-slate-900 whitespace-nowrap">
                Makaan4U
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="flex items-center space-x-1">
              {getVisibleNavItems().map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActivePath(item.path)
                      ? "text-blue-600 bg-blue-50 border border-blue-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Search - Fixed Alignment */}
            <div className="relative" ref={searchRef}>
              {/* Mobile Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors hover:bg-slate-100 rounded-lg"
              >
                <Search size={18} />
              </button>

              {/* Desktop Search - Fixed Layout */}
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
                      className="w-48 xl:w-64 pl-10 pr-4 h-9 text-sm border-slate-300 focus:border-blue-300"
                    />
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-9 px-4 text-sm bg-blue-600 hover:bg-blue-700 whitespace-nowrap flex items-center justify-center"
                  >
                    Search
                  </Button>
                </form>
              </div>

              {/* Mobile Search Overlay */}
              {isSearchOpen && (
                <div className="lg:hidden absolute top-12 right-0 w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-50">
                  <form onSubmit={handleSearch} className="space-y-3">
                    <div className="relative">
                      <Input
                        type="search"
                        placeholder="Search properties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 text-sm pl-10"
                        autoFocus
                      />
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-10 text-sm bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
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
                  className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors hover:bg-slate-100 rounded-lg"
                >
                  <Bell size={18} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="absolute top-12 right-0 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                    <div className="p-4 border-b border-slate-200">
                      <h3 className="font-semibold text-slate-900 text-sm">
                        Notifications ({getNotifications().length})
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {getNotifications().map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors cursor-pointer"
                          onClick={() => {
                            setIsNotificationOpen(false);
                            // Handle notification click based on type
                            toast.info(`Opening: ${notification.title}`);
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                notification.type === "success"
                                  ? "bg-green-500"
                                  : notification.type === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 truncate">
                                {notification.title}
                              </p>
                              <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-500 mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-200">
                      <Button
                        variant="ghost"
                        className="w-full text-sm h-9"
                        onClick={() => {
                          setIsNotificationOpen(false);
                          navigate("/notifications");
                        }}
                      >
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Language Selector */}
            <div className="relative hidden sm:block" ref={languageRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-2 sm:px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
              >
                <Globe size={16} />
                <span className="hidden md:inline max-w-20 truncate">
                  {getCurrentLanguage()}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {isLanguageOpen && (
                <div className="absolute top-12 right-0 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                  <div className="p-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                          language === lang.code
                            ? "text-blue-600 bg-blue-50 font-medium"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className="flex-1 text-left">{lang.label}</span>
                        {language === lang.code && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-sm font-medium text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="hidden xl:block text-left min-w-0 max-w-32">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {truncateText(user.name, 15)}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {truncateText(user.email, 20)}
                    </p>
                  </div>
                  <ChevronDown
                    size={14}
                    className="text-slate-600 hidden sm:block"
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute top-12 right-0 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                    <div className="p-4 border-b border-slate-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                          <span className="text-sm font-medium text-white">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm truncate">
                            {user.name}
                          </p>
                          <p className="text-sm text-slate-600 mt-1 truncate">
                            {user.email}
                          </p>
                        </div>
                        {getRoleBadge()}
                      </div>
                    </div>

                    <div className="p-2">
                      {getProfileMenuItems().map((item) => (
                        <button
                          key={item.path}
                          onClick={item.onClick}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <item.icon size={16} className="flex-shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="p-2 border-t border-slate-200">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut size={16} className="flex-shrink-0" />
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
                  className="h-9 text-sm text-slate-700 hover:text-slate-900 whitespace-nowrap"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate("/auth/register")}
                  className="h-9 text-sm bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors hover:bg-slate-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <nav className="py-3 space-y-1">
              {getVisibleNavItems().map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg mx-2 ${
                    isActivePath(item.path)
                      ? "text-blue-600 bg-blue-50 border border-blue-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <item.icon size={16} className="flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}

              {/* Mobile Login Button */}
              {!user && (
                <div className="px-4 py-3 border-t border-slate-200">
                  <div className="flex space-x-3">
                    <Button
                      variant="ghost"
                      onClick={handleLogin}
                      className="flex-1 h-11 text-sm text-slate-700 hover:text-slate-900 border border-slate-300"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => navigate("/auth/register")}
                      className="flex-1 h-11 text-sm bg-blue-600 hover:bg-blue-700"
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              )}

              {/* User Info in Mobile Menu */}
              {user && (
                <div className="px-4 py-3 border-t border-slate-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                      <span className="text-base font-medium text-white">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-600 truncate">
                        {user.email}
                      </p>
                    </div>
                    {getRoleBadge()}
                  </div>
                </div>
              )}

              {/* Mobile Language Selector */}
              <div className="px-4 py-3 border-t border-slate-200">
                <div className="flex items-center space-x-3 text-sm text-slate-600 mb-3">
                  <Globe size={16} className="flex-shrink-0" />
                  <span>Language: {getCurrentLanguage()}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`px-2 py-2 text-xs rounded-lg border transition-colors text-center ${
                        language === lang.code
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Logout Button */}
              {user && (
                <div className="px-4 pt-3 border-t border-slate-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
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