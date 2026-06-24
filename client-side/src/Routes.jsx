import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Lazy loaded components (Code Splitting)
const NotFound = lazy(() => import("pages/NotFound"));
const PropertyDetails = lazy(() => import("./pages/property-details"));
const PropertyListings = lazy(() => import("./pages/property-listings"));
const HomePage = lazy(() => import("./pages/home-page"));
const AuthLayout = lazy(() => import("./pages/auth"));
const Signin = lazy(() => import("./pages/auth/signin/signin"));
const Signup = lazy(() => import("./pages/auth/signup/signup"));
const ForgotPassword = lazy(() => import("./pages/auth/forgot-password/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/reset-password/ResetPassword"));
const Blog = lazy(() => import("./pages/blogs/Blog"));
const About = lazy(() => import("./pages/about/About"));

// Import the new admin structure
const AdminLayout = lazy(() => import("./pages/admin-dashboard/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin-dashboard/dashboard/AdminDashboard"));
const ReportsDashboard = lazy(() => import("./pages/admin-dashboard/reports/ReportsDashboard"));
const PropertyDashboard = lazy(() => import("./pages/admin-dashboard/property/PropertyDashboard"));
const PostProperty = lazy(() => import("./pages/admin-dashboard/postProperty/PostProperty"));
const UserDashboard = lazy(() => import("./pages/admin-dashboard/users/UserDashboard"));
const AnalyticsDashboard = lazy(() => import("./pages/admin-dashboard/analytics/AnalyticsDashboard"));

// Import Profile components
const ProfileLayout = lazy(() => import("./pages/profile/ProfileLayout"));
const Profile = lazy(() => import("./pages/profile/components/Profile"));
const Favorites = lazy(() => import("./pages/profile/components/Favorites"));
const Settings = lazy(() => import("./pages/profile/components/Settings"));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex h-screen items-center justify-center bg-slate-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
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

            {/* Admin Routes with Layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="reports" element={<ReportsDashboard />} />
              <Route path="post-property" element={<PostProperty />} />
              <Route path="properties/edit/:id" element={<PostProperty />} />
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
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;