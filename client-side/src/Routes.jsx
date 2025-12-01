// import React from "react";
// import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
// import ScrollToTop from "components/ScrollToTop";
// import ErrorBoundary from "components/ErrorBoundary";
// import NotFound from "pages/NotFound";
// import PropertyDetails from "./pages/property-details";
// import PropertyListings from "./pages/property-listings";
// import HomePage from "./pages/home-page";
// import AuthLayout from "./pages/auth"; // Import AuthLayout
// import Signin from "./pages/auth/signin/signin";
// import Signup from "./pages/auth/signup/signup";
// import Blog from "./pages/blogs/Blog";
// import About from "./pages/about/About";

// // Import the new admin structure
// import AdminLayout from "./pages/admin-dashboard/AdminLayout";
// import AdminDashboard from "./pages/admin-dashboard/dashboard/AdminDashboard";
// import ReportsDashboard from "./pages/admin-dashboard/reports/ReportsDashboard";
// import PropertyDashboard from "./pages/admin-dashboard/property/PropertyDashboard";
// import PostProperty from "./pages/admin-dashboard/postProperty/PostProperty";
// import UserDashboard from "./pages/admin-dashboard/users/UserDashboard";
// import AnalyticsDashboard from "./pages/admin-dashboard/analytics/AnalyticsDashboard";

// const Routes = () => {
//   return (
//     <BrowserRouter>
//       <ErrorBoundary>
//         <ScrollToTop />
//         <RouterRoutes>
//           {/* Public Routes */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/home-page" element={<HomePage />} />
//           <Route path="/property-listings" element={<PropertyListings />} />
//           {/* <Route path="/property-details/:id" element={<PropertyDetails />} /> */}
//           <Route path="/property-details/:slug" element={<PropertyDetails />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/about" element={<About />} />

//           {/* Auth Routes with Layout */}
//           <Route path="/auth" element={<AuthLayout />}>
//             <Route path="login" element={<Signin />} />
//             <Route path="register" element={<Signup />} />
//           </Route>

//           {/* Direct auth routes for backward compatibility */}
//           <Route
//             path="/login"
//             element={
//               <AuthLayout>
//                 <Signin />
//               </AuthLayout>
//             }
//           />
//           <Route
//             path="/register"
//             element={
//               <AuthLayout>
//                 <Signup />
//               </AuthLayout>
//             }
//           />

//           {/* Admin Routes with Layout */}
//           <Route path="/admin" element={<AdminLayout />}>
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="reports" element={<ReportsDashboard />} />
//             <Route path="post-property" element={<PostProperty />} />
//             <Route path="properties" element={<PropertyDashboard />} />
//             <Route path="users" element={<UserDashboard />} />
//             <Route path="analytics" element={<AnalyticsDashboard />} />
//           </Route>

//           {/* Legacy routes for backward compatibility - redirect to new structure */}
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/reports-dashboard" element={<ReportsDashboard />} />

//           {/* 404 Page */}
//           <Route path="*" element={<NotFound />} />
//         </RouterRoutes>
//       </ErrorBoundary>
//     </BrowserRouter>
//   );
// };

// export default Routes;
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PropertyDetails from "./pages/property-details";
import PropertyListings from "./pages/property-listings";
import HomePage from "./pages/home-page";
import AuthLayout from "./pages/auth";
import Signin from "./pages/auth/signin/signin";
import Signup from "./pages/auth/signup/signup";
import Blog from "./pages/blogs/Blog";
import About from "./pages/about/About";

// Import the new admin structure
import AdminLayout from "./pages/admin-dashboard/AdminLayout";
import AdminDashboard from "./pages/admin-dashboard/dashboard/AdminDashboard";
import ReportsDashboard from "./pages/admin-dashboard/reports/ReportsDashboard";
import PropertyDashboard from "./pages/admin-dashboard/property/PropertyDashboard";
import PostProperty from "./pages/admin-dashboard/postProperty/PostProperty";
import UserDashboard from "./pages/admin-dashboard/users/UserDashboard";
import AnalyticsDashboard from "./pages/admin-dashboard/analytics/AnalyticsDashboard";

// Import Profile components
import ProfileLayout from "./pages/profile/ProfileLayout";
import Profile from "./pages/profile/components/Profile";
import Favorites from "./pages/profile/components/Favorites";
import Settings from "./pages/profile/components/Settings";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/property-listings" element={<PropertyListings />} />
          <Route path="/property-details/:slug" element={<PropertyDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />

          {/* Auth Routes with Layout */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Signin />} />
            <Route path="register" element={<Signup />} />
          </Route>

          {/* Direct auth routes for backward compatibility */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Signin />
              </AuthLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Signup />
              </AuthLayout>
            }
          />

          {/* Profile Routes with Layout - USE ONLY THIS ONE */}
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* REMOVE THESE - They cause the undefined children error */}
          {/* <Route
            path="/my-profile"
            element={
              <ProfileLayout>
                <Profile />
              </ProfileLayout>
            }
          />
          <Route
            path="/my-favorites"
            element={
              <ProfileLayout>
                <Favorites />
              </ProfileLayout>
            }
          />
          <Route
            path="/account-settings"
            element={
              <ProfileLayout>
                <Settings />
              </ProfileLayout>
            }
          /> */}

          {/* Admin Routes with Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="reports" element={<ReportsDashboard />} />
            <Route path="post-property" element={<PostProperty />} />
            <Route path="properties" element={<PropertyDashboard />} />
            <Route path="users" element={<UserDashboard />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
          </Route>

          {/* Legacy routes for backward compatibility */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/reports-dashboard" element={<ReportsDashboard />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;