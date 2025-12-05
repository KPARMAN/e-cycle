import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { RecycleIcon } from "lucide-react";

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      navigate("/auth/signup", { state: { role: selectedRole } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-center pt-6 sm:pt-8 pb-8 sm:pb-12">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <RecycleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-semibold text-gray-800">E-Cycle</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Choose Your Role
          </h1>
          <p className="text-sm sm:text-lg text-gray-600">
            Start by choosing how you want to participate
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Seller Card */}
          <div
            onClick={() => setSelectedRole("seller")}
            className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
              selectedRole === "seller"
                ? "border-green-600 shadow-lg bg-white"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <img
              src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg"
              alt="Seller - Package your e-waste"
              className="w-full h-40 sm:h-64 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Seller</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                List your e-waste and connect with verified recyclers
              </p>
              <Button className="w-full bg-green-100 text-green-700 hover:bg-green-200 border border-green-300 text-sm sm:text-base py-2 sm:py-3">
                Seller
              </Button>
            </div>
          </div>

          {/* Recycler Card */}
          <div
            onClick={() => setSelectedRole("recycler")}
            className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
              selectedRole === "recycler"
                ? "border-green-600 shadow-lg bg-white"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <img
              src="https://images.pexels.com/photos/34406295/pexels-photo-34406295.jpeg"
              alt="Recycler - Process e-waste"
              className="w-full h-40 sm:h-64 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Recycler</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Connect with technicians and grow your recycling network
              </p>
              <Button className="w-full bg-green-100 text-green-700 hover:bg-green-200 border border-green-300 text-sm sm:text-base py-2 sm:py-3">
                Recycler
              </Button>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center pb-6 sm:pb-8">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="w-full sm:w-auto px-8 sm:px-12 py-2 sm:py-3 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
