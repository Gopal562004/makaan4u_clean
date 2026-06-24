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
    role: "customer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Phone number must be 10 digits";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) newErrors.password = "Password must contain uppercase, lowercase and number";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, "");
    if (phoneNumber.length <= 3) return phoneNumber;
    else if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    else return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formattedPhone });
    if (errors.phone) setErrors({ ...errors, phone: "" });
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
        phone: formData.phone.replace(/\D/g, ""),
      });
      if (result.success) {
        toast.success("Account created successfully! Welcome!");
        setTimeout(() => {
          if (result.user.role === "admin") navigate("/admin/dashboard");
          else if (result.user.role === "agent" || result.user.role === "employee") navigate("/agent/dashboard");
          else navigate("/");
        }, 1500);
      }
    } catch (error) {
      const errorMessage = error.message || "Registration failed. Please try again.";
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

  return (
    <div className="w-full max-w-sm bg-white rounded-md shadow-sm border border-gray-200 p-6 mx-auto my-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Create Account</h1>
        <p className="text-gray-500 text-xs">Join Makaan4U today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            icon={User}
            error={errors.name}
            className="bg-gray-50 border-gray-200"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            required
            icon={Mail}
            error={errors.email}
            className="bg-gray-50 border-gray-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="(987) 654-3210"
            required
            icon={Phone}
            error={errors.phone}
            maxLength={14}
            className="bg-gray-50 border-gray-200 text-sm"
          />
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-2 py-1.5 border border-gray-200 bg-gray-50 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

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
              error={errors.password}
              className="bg-gray-50 border-gray-200 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-[34px] text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
              error={errors.confirmPassword}
              className="bg-gray-50 border-gray-200 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-[34px] text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <input
            type="checkbox"
            required
            className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span className="text-xs text-gray-600">
            I agree to the{" "}
            <Link to="/terms" className="font-medium text-green-600 hover:text-green-500">Terms</Link>
            {" "}and{" "}
            <Link to="/privacy" className="font-medium text-green-600 hover:text-green-500">Privacy Policy</Link>
          </span>
        </div>

        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium mt-4 transition-colors text-sm"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-medium text-green-600 hover:text-green-500">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
