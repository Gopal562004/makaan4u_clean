import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PropertyDetails from "./pages/property-details";
import PropertyListings from "./pages/property-listings";
import HomePage from "./pages/home-page";
import AuthLayout from "./pages/auth"; // Import AuthLayout
import Signin from "./pages/auth/signin/signin";
import Signup from "./pages/auth/signup/signup";

// Import the new admin structure
import AdminLayout from "./pages/admin-dashboard/AdminLayout";
import AdminDashboard from "./pages/admin-dashboard/dashboard/AdminDashboard";
import ReportsDashboard from "./pages/admin-dashboard/reports/ReportsDashboard";
import PropertyDashboard from "./pages/admin-dashboard/property/PropertyDashboard";
import PostProperty from "./pages/admin-dashboard/postProperty/PostProperty";
import UserDashboard from "./pages/admin-dashboard/users/UserDashboard";
import AnalyticsDashboard from "./pages/admin-dashboard/analytics/AnalyticsDashboard";

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
          <Route path="/property-details/:id" element={<PropertyDetails />} />

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

          {/* Admin Routes with Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="reports" element={<ReportsDashboard />} />
            <Route path="post-property" element={<PostProperty />} />
            <Route path="properties" element={<PropertyDashboard />} />
            <Route path="users" element={<UserDashboard />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
          </Route>

          {/* Legacy routes for backward compatibility - redirect to new structure */}
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