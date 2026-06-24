import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Lock, Eye, EyeOff, ShieldCheck, Hash, Mail } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { resetPassword } from "../../../lib/mongo/services/authService";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location.state?.email || "";

  const [formData, setFormData] = useState({
    email: initialEmail,
    otp: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.otp || formData.otp.length !== 6) {
      newErrors.otp = "Please enter the 6-digit code";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const response = await resetPassword({ 
        email: formData.email, 
        otp: formData.otp, 
        password: formData.password 
      });
      
      if (response.success) {
        toast.success("Password reset successfully! You are now logged in.");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      const msg = err.message || "Failed to reset password. The code might be expired.";
      toast.error(msg);
      setErrors({ otp: "Invalid or expired code" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-md shadow-sm border border-gray-200 p-6 mx-auto my-4">
      
      <div className="text-center mb-6">
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Verify & Reset</h1>
        <p className="text-gray-500 text-xs">
          Enter the 6-digit code sent to your email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
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
            className="bg-gray-50 border-gray-200 text-sm"
          />
        </div>

        <div className="space-y-1">
          <Input
            label="6-Digit Code"
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="123456"
            required
            icon={Hash}
            maxLength={6}
            error={errors.otp}
            className="bg-gray-50 border-gray-200 text-sm tracking-widest font-mono"
          />
        </div>

        <div className="space-y-1 relative">
          <Input
            label="New Password"
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

        <div className="space-y-1 relative">
          <Input
            label="Confirm New Password"
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

        <Button
          type="submit"
          loading={loading}
          disabled={loading || !formData.email || !formData.otp || !formData.password || !formData.confirmPassword}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium mt-2 transition-colors"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
      
      <div className="text-center mt-5">
        <Link to="/auth/forgot-password" className="text-xs text-blue-600 hover:text-blue-500 font-medium">
          Didn't receive code? Try again
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
