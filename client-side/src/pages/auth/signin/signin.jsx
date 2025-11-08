// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
// import { toast } from "react-toastify";
// import Button from "../../../components/ui/Button";
// import Input from "../../../components/ui/Input";
// import { login } from "../../../lib/mongo/services/authService";

// const Signin = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fix the form errors");
//       return;
//     }

//     setLoading(true);
//     setErrors({});

//     try {
//       const result = await login({
//         email: formData.email,
//         password: formData.password,
//       });

//       if (result.success) {
//         toast.success("Login successful!");
//         setTimeout(() => {
//           navigate("/");
//         }, 1000);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       const errorMessage = error.message || "Login failed. Please try again.";

//       if (errorMessage.includes("Invalid email or password")) {
//         setErrors({
//           email: "Invalid credentials",
//           password: "Invalid credentials",
//         });
//         toast.error("Invalid email or password");
//       } else {
//         toast.error(errorMessage);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full max-w-sm mx-auto">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
//           <LogIn className="w-6 h-6 text-blue-600" />
//         </div>
//         <h1 className="text-2xl font-semibold text-gray-900 mb-2">
//           Welcome Back
//         </h1>
//         <p className="text-gray-500 text-sm">Sign in to your account</p>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Email Field */}
//         <div className="space-y-1">
//           <Input
//             label="Email"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="your@email.com"
//             required
//             icon={Mail}
//             error={errors.email}
//           />
//         </div>

//         {/* Password Field */}
//         <div className="space-y-1">
//           <div className="relative">
//             <Input
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="••••••••"
//               required
//               icon={Lock}
//               error={errors.password}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>

//         {/* Options Row */}
//         <div className="flex items-center justify-between text-sm">
//           <label className="flex items-center space-x-2 cursor-pointer">
//             <input
//               type="checkbox"
//               className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//             />
//             <span className="text-gray-600">Remember me</span>
//           </label>
//           <Link
//             to="/forgot-password"
//             className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
//           >
//             Forgot password?
//           </Link>
//         </div>

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           loading={loading}
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-medium transition-colors"
//         >
//           {loading ? "Signing In..." : "Sign In"}
//         </Button>
//       </form>

//       {/* Divider */}
//       <div className="my-6 flex items-center">
//         <div className="flex-1 border-t border-gray-200"></div>
//         <span className="px-3 text-sm text-gray-500">or</span>
//         <div className="flex-1 border-t border-gray-200"></div>
//       </div>

//       {/* Social Login */}
//       <div className="space-y-3">
//         <Button
//           variant="outline"
//           className="w-full flex items-center justify-center space-x-2 py-2.5 text-sm hover:bg-gray-50 transition-colors"
//         >
//           <svg className="w-4 h-4" viewBox="0 0 24 24">
//             <path
//               fill="#4285F4"
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//             />
//           </svg>
//           <span>Continue with Google</span>
//         </Button>
//       </div>

//       {/* Sign Up Link */}
//       <div className="text-center mt-6 pt-5 border-t border-gray-100">
//         <p className="text-gray-600 text-sm">
//           Don't have an account?{" "}
//           <Link
//             to="/auth/register"
//             className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
//           >
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signin;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { login } from "../../../lib/mongo/services/authService";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getRedirectPath = (userRole) => {
    switch (userRole) {
      case "admin":
        return "/admin/dashboard";
      case "agent":
        return "/agent/dashboard";
      case "customer":
        return "/";
      default:
        return "/";
    }
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
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        const { user } = result;
        console.log("Login successful for user:", user);
        const redirectPath = getRedirectPath(user.role);

        toast.success(`Welcome back, ${user.name}!`);

        setTimeout(() => {
          navigate(redirectPath, {
            replace: true,
            state: {
              from: "login",
              user: user,
            },
          });
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.message || "Login failed. Please try again.";

      if (errorMessage.includes("Invalid email or password")) {
        setErrors({
          email: "Invalid credentials",
          password: "Invalid credentials",
        });
        toast.error("Invalid email or password");
      } else if (errorMessage.includes("deactivated")) {
        toast.error(
          "Your account has been deactivated. Please contact support."
        );
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo login function for testing different roles
  const handleDemoLogin = async (role = "customer") => {
    setLoading(true);

    const demoAccounts = {
      admin: { email: "admin@demo.com", password: "demo123" },
      agent: { email: "agent@demo.com", password: "demo123" },
      customer: { email: "customer@demo.com", password: "demo123" },
    };

    try {
      // For demo purposes, simulate API response
      const demoUser = {
        id: `demo-${role}-id`,
        name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
        email: demoAccounts[role].email,
        role: role,
        phone: "+1234567890",
        avatar: "",
      };

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const redirectPath = getRedirectPath(role);
      toast.success(`Demo ${role} login successful!`);

      setTimeout(() => {
        navigate(redirectPath, {
          replace: true,
          state: {
            from: "demo-login",
            user: demoUser,
          },
        });
      }, 1000);
    } catch (error) {
      toast.error("Demo login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
          <LogIn className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-sm">Sign in to your account</p>
      </div>

      {/* Demo Login Buttons */}
      <div className="mb-4 space-y-2">
        <p className="text-center text-xs text-gray-500 font-medium">
          Try demo accounts:
        </p>
        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin("customer")}
            disabled={loading}
            className="text-xs py-1.5 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors"
          >
            Customer
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin("agent")}
            disabled={loading}
            className="text-xs py-1.5 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
          >
            Agent
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin("admin")}
            disabled={loading}
            className="text-xs py-1.5 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
          >
            Admin
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 flex items-center">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-3 text-xs text-gray-500">or sign in manually</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            icon={Mail}
            error={errors.email}
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1">
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
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Options Row */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-600">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-medium transition-colors"
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-3 text-sm text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Social Login */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 py-2.5 text-sm hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
          </svg>
          <span>Continue with Google</span>
        </Button>
      </div>

      {/* Sign Up Link */}
      <div className="text-center mt-6 pt-5 border-t border-gray-100">
        <p className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;