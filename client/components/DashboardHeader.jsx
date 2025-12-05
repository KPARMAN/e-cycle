import { useNavigate } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";

export default function DashboardHeader({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Side - Greeting */}
        <div className="pt-2 lg:pt-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Hi Chidi! 👋</h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Welcome back to your dashboard
          </p>
        </div>

        {/* Search Bar - Mobile and Desktop */}
        <div className="w-full sm:flex-1 sm:max-w-md lg:max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side - Notification and Profile */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
          {/* Notification Bell */}
          <button
            onClick={() => navigate("/dashboard/notifications")}
            className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Profile"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
              L
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
