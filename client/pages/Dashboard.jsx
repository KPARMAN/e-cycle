import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar.jsx";
import DashboardHeader from "@/components/DashboardHeader.jsx";
import {
  BarChart3,
  Package,
  TrendingUp,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const activities = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      action: "Listed 24 items for recycling",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Alex Chen",
      avatar:
        "https://images.pexels.com/photos/4349812/pexels-photo-4349812.jpeg",
      action: "Completed transaction with value ₦450",
      time: "5 hours ago",
    },
    {
      id: 3,
      user: "Maria Garcia",
      avatar:
        "https://images.pexels.com/photos/2220294/pexels-photo-2220294.jpeg",
      action: "Updated inventory status",
      time: "1 day ago",
    },
  ];

  const metricCards = [
    {
      id: 1,
      icon: BarChart3,
      label: "Active recyclers",
      value: "8",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: 2,
      icon: Package,
      label: "Listing views",
      value: "8",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      icon: TrendingUp,
      label: "Waste listed",
      value: "8",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Dashboard Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Dashboard Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metricCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    className={`${card.color} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">
                          {card.label}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                          {card.value}
                        </p>
                      </div>
                      <Icon className={`${card.iconColor} w-12 h-12`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Listings Summary */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Listings Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Active listings
                    </p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">288</p>
                  </div>
                  <MapPin className="text-black w-12 h-12" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Expired listings
                    </p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">288</p>
                  </div>
                  <Clock className="text-black w-12 h-12" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Recent Activities
            </h3>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={activity.avatar}
                      alt={activity.user}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Cards */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Value My E-Waste
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Get an instant valuation of your electronic waste items
                  </p>
                </div>
                <Button className="bg-green-600 text-white hover:bg-green-700 w-fit mt-4">
                  Get Valuation
                </Button>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Manage Listings
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Edit, update, or remove your existing listings
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/dashboard/manage-listings")}
                  className="bg-blue-600 text-white hover:bg-blue-700 w-fit mt-4"
                >
                  Manage Now
                </Button>
              </div>
            </div>
          </div>

          {/* Explore Listing */}
          <div className="mb-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Explore Listings
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Discover items listed by other sellers in your area
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/dashboard/explore-listing")}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Explore Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
