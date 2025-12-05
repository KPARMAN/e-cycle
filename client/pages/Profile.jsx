import Sidebar from "@/components/Sidebar.jsx";
import DashboardHeader from "@/components/DashboardHeader.jsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Camera } from "lucide-react";

export default function Profile() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Chidi",
    lastName: "Okonkwo",
    email: "chidi.okonkwo@example.com",
    phone: "+234-701-234-5678",
    company: "Eco-Waste Nigeria Ltd",
    bio: "Professional e-waste recycling specialist with 5+ years of experience",
    location: "Lagos",
    rating: "4.8",
    reviews: "156",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                My Profile
              </h2>
              <p className="text-gray-600">
                Manage your profile information and settings
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-8 shadow-sm">
              {/* Profile Picture */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-4xl font-bold">
                    C
                  </div>
                  <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-gray-600">{profileData.company}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold text-gray-900">
                        {profileData.rating}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      ({profileData.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-200 disabled:text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-200 disabled:text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-200 disabled:text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-200 disabled:text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-200 disabled:text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={profileData.company}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-200 disabled:text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Role
                  </label>
                  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-green-200 text-gray-900">
                    E waste seller
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleSave}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        Save Changes
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="text-gray-700"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
