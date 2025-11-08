import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search, Sparkles } from "lucide-react";
import Button from "../components/ui/Button";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="text-center max-w-lg">
        {/* Animated Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-sm flex items-center justify-center border border-gray-100 animate-pulse">
              <Search className="w-12 h-12 text-blue-400" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Content with Animation */}
        <div className="space-y-4 mb-8 animate-fade-in">
          <h1 className="text-7xl font-bold text-gray-900 animate-bounce-in">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800 animate-slide-up">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed animate-fade-in-delayed">
            Sorry, we couldn't find the page you're looking for. The page might
            have been moved or doesn't exist.
          </p>
        </div>

        {/* Animated Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delayed">
          <Button
            variant="outline"
            icon={ArrowLeft}
            iconPosition="left"
            onClick={() => window.history.back()}
            className="flex-1 sm:flex-none hover:scale-105 transition-transform duration-200"
          >
            Go Back
          </Button>

          <Button
            variant="primary"
            icon={Home}
            iconPosition="left"
            onClick={handleGoHome}
            className="flex-1 sm:flex-none hover:scale-105 transition-transform duration-200"
          >
            Home Page
          </Button>
        </div>

        {/* Subtle Help Text */}
        <p className="text-gray-400 text-sm mt-8 animate-fade-in">
          If you believe this is an error, please contact support.
        </p>
      </div>

      {/* Add custom animations to global CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-fade-in-delayed {
          animation: fadeIn 0.6s ease-out 0.3s both;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out 0.2s both;
        }
        .animate-slide-up-delayed {
          animation: slideUp 0.6s ease-out 0.4s both;
        }
        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
