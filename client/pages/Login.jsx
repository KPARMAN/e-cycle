import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { RecycleIcon, Apple, Mail } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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
        } else {
          delete newErrors.password;
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
      // Just navigate to home as per "just ui route" requirement
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-center pt-6 pb-8">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <RecycleIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-800">E-Cycle</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Testimonial */}
          <div className="bg-green-100 rounded-2xl p-8 flex flex-col justify-center">
            <div className="mb-6">
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
                alt="Customer testimonial"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed text-center">
              "Ever since I started using this platform, submitting my LOTs has
              become effortless, and I finally feel confident knowing every
              step—from verification to payment—is recorded, secure, and
              completely visible to me"
            </p>
            <div className="text-center">
              <p className="font-semibold text-gray-900">Michael Chen</p>
              <p className="text-sm text-gray-600">
                IT Director, TechCorp Solutions
              </p>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="text-sm text-gray-700">
                Over 700+ Sellers and Recyclers joined
              </span>
              <div className="flex -space-x-2">
                <img
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
                  alt="User"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/4349812/pexels-photo-4349812.jpeg"
                  alt="User"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors ${
                    touched.email && errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-green-300 focus:border-green-500"
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors ${
                    touched.password && errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-green-300 focus:border-green-500"
                  }`}
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-green-300"
                  />
                  <span className="text-gray-700 text-sm">Remember Me</span>
                </label>
                <a
                  href="#"
                  className="text-green-600 hover:text-green-700 text-sm font-semibold"
                >
                  Forgotten password?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 text-white hover:bg-green-700 py-3 rounded-lg font-semibold mt-6"
              >
                Login
              </Button>
            </form>

            {/* OAuth Options */}
            <div className="mt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-600 text-sm">Or Continue With</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Button className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-3 flex items-center justify-center gap-2">
                  <Apple className="w-5 h-5" />
                </Button>
                <Button className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-3 flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                </Button>
                <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-3 flex items-center justify-center gap-2">
                  f
                </Button>
              </div>
            </div>

            {/* Signup Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
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
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Do not have an Account?{" "}
                <button
                  onClick={() => navigate("/auth/role-selection")}
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
