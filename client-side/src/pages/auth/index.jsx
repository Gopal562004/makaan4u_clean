import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/ui/Header"; // Adjust path as needed
import Footer from "../../components/ui/Footer"; // Adjust path as needed

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content - Auth Pages */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet /> {/* This will render Signin or Signup */}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AuthLayout;
