import { useNavigate } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";

export default function DashboardHeader({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Side - Greeting and Search */}
        <div className="flex-1 flex items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hi Lucky! 👋</h1>
            <p className="text-sm text-gray-600">Welcome back to your dashboard</p>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search listings, inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Notification and Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button
            onClick={() => navigate("/dashboard/notifications")}
            className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
              L
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
