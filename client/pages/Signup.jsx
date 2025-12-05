import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { RecycleIcon, Apple, Mail } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "seller";

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password =
        "Password must include numbers and special characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          newErrors.fullName = "Full name is required";
        } else {
          delete newErrors.fullName;
        }
        break;
      case "companyName":
        if (!value.trim()) {
          newErrors.companyName = "Company name is required";
        } else {
          delete newErrors.companyName;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Invalid email format";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)) {
          newErrors.password =
            "Password must include numbers and special characters";
        } else {
          delete newErrors.password;
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-center pt-4 sm:pt-6 pb-6 sm:pb-8">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <RecycleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-semibold text-gray-800">
            E-Cycle
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Testimonial (Hidden on mobile) */}
          <div className="hidden lg:flex bg-green-100 rounded-2xl p-8 flex-col justify-center">
            <div className="mb-6">
              <img
                src="https://images.pexels.com/photos/30820659/pexels-photo-30820659.jpeg"
                alt="Customer testimonial"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed text-center">
              "Ever since I started using this platform, listing my waste has
              become effortless, and I finally feel confident knowing every
              step—from listings to connecting with recyclers, secure, and
              completely visible to me"
            </p>
            <div className="text-center">
              <p className="font-semibold text-gray-900">Olawale Ogunmola</p>
              <p className="text-sm text-gray-600">
                IT Director, Tech Solutions Nigeria
              </p>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="text-sm text-gray-700">
                Over 700+ Sellers and Recyclers joined
              </span>
              <div className="flex -space-x-2">
                <img
                  src="https://images.pexels.com/photos/32401765/pexels-photo-32401765.jpeg"
                  alt="User"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/7191260/pexels-photo-7191260.jpeg"
                  alt="User"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full">
            <Button
              onClick={() => navigate("/")}
              className="mb-6 px-4 py-2 text-gray-700 hover:text-green-600 bg-transparent hover:bg-gray-100 rounded-lg font-medium transition-colors text-sm"
              aria-label="Go back to home page"
            >
              ← Back to Home
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Create An account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 sm:py-3 rounded-lg border-2 focus:outline-none transition-colors text-sm sm:text-base ${
                    touched.fullName && errors.fullName
                      ? "border-red-500 bg-red-50"
                      : "border-green-300 focus:border-green-500"
                  }`}
                />
                {touched.fullName && errors.fullName && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 sm:py-3 rounded-lg border-2 focus:outline-none transition-colors text-sm sm:text-base ${
                    touched.companyName && errors.companyName
                      ? "border-red-500 bg-red-50"
                      : "border-green-300 focus:border-green-500"
                  }`}
                />
                {touched.companyName && errors.companyName && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 sm:py-3 rounded-lg border-2 focus:outline-none transition-colors text-sm sm:text-base ${
                    touched.email && errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-green-300 focus:border-green-500"
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 sm:py-3 rounded-lg border-2 focus:outline-none transition-colors text-sm sm:text-base ${
                    touched.password && errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-green-300 focus:border-green-500"
                  }`}
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 sm:py-3 rounded-lg border-2 focus:outline-none transition-colors text-sm sm:text-base ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500 bg-red-50"
                      : "border-green-300 focus:border-green-500"
                  }`}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  Password must be at least 8 character including numbers and
                  special characters
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 text-white hover:bg-green-700 py-2 sm:py-3 rounded-lg font-semibold mt-6 text-sm sm:text-base"
              >
                Create An account
              </Button>
            </form>

            {/* OAuth Options */}
            <div className="mt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-600 text-xs sm:text-sm">
                  Or Continue With
                </span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <Button
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 sm:py-3 flex items-center justify-center gap-2"
                  aria-label="Sign up with Apple"
                >
                  <Apple className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline text-sm">Apple</span>
                </Button>
                <Button
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 sm:py-3 flex items-center justify-center gap-2"
                  aria-label="Sign up with Google"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline text-sm">Google</span>
                </Button>
                <Button
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-2 sm:py-3 flex items-center justify-center text-sm sm:text-base font-bold"
                  aria-label="Sign up with Facebook"
                >
                  f
                </Button>
              </div>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                <input type="checkbox" className="mr-2" />
                By signing up, I agree to the{" "}
                <a href="#" className="text-gray-900 underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-gray-900 underline">
                  Privacy Policy
                </a>
                .
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                Already Have an Account?{" "}
                <button
                  onClick={() => navigate("/auth/login")}
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
