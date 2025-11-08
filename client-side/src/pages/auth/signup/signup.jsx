import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { register } from "../../../lib/mongo/services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer", // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase and number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const { confirmPassword, ...registrationData } = formData;

      const result = await register({
        ...registrationData,
        phone: formData.phone.replace(/\D/g, ""), // Clean phone number
      });

      if (result.success) {
        toast.success("Account created successfully! Welcome!");

        // Redirect based on user role
        setTimeout(() => {
          if (result.user.role === "admin") {
            navigate("/admin/dashboard");
          } else if (result.user.role === "agent") {
            navigate("/agent/dashboard");
          } else {
            navigate("/");
          }
        }, 1500);
      }
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific error messages from backend
      const errorMessage =
        error.message || "Registration failed. Please try again.";

      if (errorMessage.includes("already exists")) {
        setErrors({ email: "Email already registered" });
        toast.error("An account with this email already exists");
      } else if (errorMessage.includes("email")) {
        setErrors({ email: errorMessage });
        toast.error(errorMessage);
      } else if (errorMessage.includes("password")) {
        setErrors({ password: errorMessage });
        toast.error(errorMessage);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setFormData({
      name: "Demo User",
      email: `demo${Math.floor(Math.random() * 1000)}@example.com`,
      phone: "9876543210",
      password: "Demo123",
      confirmPassword: "Demo123",
      role: "customer",
    });
    toast.info("Demo data filled! You can now register.");
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, "");

    // Format as (XXX) XXX-XXXX for US numbers
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formattedPhone });

    if (errors.phone) {
      setErrors({ ...errors, phone: "" });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full max-w-md mx-auto">
      {/* Compact Header */}
      <div className="text-center mb-6">
        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-2">
          <User className="w-5 h-5 text-green-600" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Create Account
        </h1>
        <p className="text-gray-500 text-xs">Join us to get started</p>
      </div>

      {/* Quick Demo Button */}
      <div className="mb-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleQuickDemo}
          className="w-full text-xs py-1.5 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
        >
          Fill Demo Data
        </Button>
      </div>

      {/* Compact Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name & Email in Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Mayur"
              required
              icon={User}
              className="text-sm"
              error={errors.name}
            />
          </div>
          <div>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="mayur@example.com"
              required
              icon={Mail}
              className="text-sm"
              error={errors.email}
            />
          </div>
        </div>

        {/* Phone & Role in Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              label="Phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="(987) 654-3210"
              required
              icon={Phone}
              className="text-sm"
              error={errors.phone}
              maxLength={14}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Passwords in Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              icon={Lock}
              className="text-sm"
              error={errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-7 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <div className="relative">
            <Input
              label="Confirm"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              icon={Lock}
              className="text-sm"
              error={errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-7 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        {formData.password && (
          <div className="text-xs text-gray-500 space-y-1">
            <div
              className={formData.password.length >= 6 ? "text-green-600" : ""}
            >
              • At least 6 characters
            </div>
            <div
              className={
                /(?=.*[a-z])/.test(formData.password) ? "text-green-600" : ""
              }
            >
              • One lowercase letter
            </div>
            <div
              className={
                /(?=.*[A-Z])/.test(formData.password) ? "text-green-600" : ""
              }
            >
              • One uppercase letter
            </div>
            <div
              className={
                /(?=.*\d)/.test(formData.password) ? "text-green-600" : ""
              }
            >
              • One number
            </div>
          </div>
        )}

        {/* Terms */}
        <div className="flex items-start space-x-2 text-xs">
          <input
            type="checkbox"
            required
            className="rounded border-gray-300 text-green-600 mt-0.5 focus:ring-green-500"
          />
          <span className="text-gray-600 leading-relaxed">
            I agree to the{" "}
            <Link
              to="/terms"
              className="text-green-600 font-medium hover:text-green-700"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-green-600 font-medium hover:text-green-700"
            >
              Privacy Policy
            </Link>
          </span>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-sm font-medium transition-colors"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      {/* Compact Divider */}
      <div className="my-4 flex items-center">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-2 text-xs text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Social Sign Up */}
      <Button
        variant="outline"
        className="w-full flex items-center justify-center space-x-2 py-2 text-xs hover:bg-gray-50 transition-colors"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
        </svg>
        <span>Sign up with Google</span>
      </Button>

      {/* Compact Sign In Link */}
      <div className="text-center mt-4 pt-3 border-t border-gray-100">
        <p className="text-gray-600 text-xs">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-green-600 font-semibold hover:text-green-700 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
