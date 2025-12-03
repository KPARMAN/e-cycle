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
      <div className="flex items-center justify-center pt-8 pb-12">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <RecycleIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-800">E-Cycle</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Choose Your Role
          </h1>
          <p className="text-lg text-gray-600">
            Start by choosing how you want to participate
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Seller</h3>
              <p className="text-gray-600 mb-4">
                List your e-waste and connect with verified recyclers
              </p>
              <Button className="w-full bg-green-100 text-green-700 hover:bg-green-200 border border-green-300">
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
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recycler</h3>
              <p className="text-gray-600 mb-4">
                Connect with technicians and grow your recycling network
              </p>
              <Button className="w-full bg-green-100 text-green-700 hover:bg-green-200 border border-green-300">
                Recycler
              </Button>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="w-full md:w-auto px-12 py-3 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
