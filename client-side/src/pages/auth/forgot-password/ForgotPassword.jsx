import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { forgotPassword } from "../../../lib/mongo/services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await forgotPassword(email);
      if (response.success) {
        toast.success("Verification code sent to your email!");
        // Navigate to the reset password page and pass the email in state
        navigate("/auth/reset-password", { state: { email } });
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Try again later.");
      toast.error(err.message || "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-md shadow-sm border border-gray-200 p-6 mx-auto my-4">
      {/* Back Button */}
      <Link to="/auth/login" className="inline-flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors mb-4 group">
        <ArrowLeft className="w-3 h-3 mr-1 transform group-hover:-translate-x-1 transition-transform" />
        Back to login
      </Link>

      <div className="text-center mb-6">
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <KeyRound className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Forgot Password?</h1>
        <p className="text-gray-500 text-xs">We'll send a 6-digit code to your email.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="name@example.com"
          icon={Mail}
          error={error}
          required
          className="bg-gray-50 border-gray-200 text-sm"
        />

        <Button
          type="submit"
          loading={loading}
          disabled={loading || !email}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition-colors"
        >
          {loading ? "Sending..." : "Send Verification Code"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
