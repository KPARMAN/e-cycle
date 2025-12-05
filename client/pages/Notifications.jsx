import Sidebar from "@/components/Sidebar.jsx";
import DashboardHeader from "@/components/DashboardHeader.jsx";
import { useState } from "react";
import { Bell, Trash2 } from "lucide-react";

export default function Notifications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Message",
      message: "You have received a new message from Sarah",
      time: "5 minutes ago",
      read: false,
      type: "message",
    },
    {
      id: 2,
      title: "Listing Expired",
      message: "Your listing for 24 items has expired",
      time: "2 hours ago",
      read: false,
      type: "listing",
    },
    {
      id: 3,
      title: "Payment Confirmed",
      message: "Payment of ₦450 has been confirmed",
      time: "1 day ago",
      read: true,
      type: "payment",
    },
    {
      id: 4,
      title: "Inventory Updated",
      message: "Your inventory has been updated successfully",
      time: "2 days ago",
      read: true,
      type: "inventory",
    },
  ]);

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "message":
        return "bg-green-100 border-green-200";
      case "listing":
        return "bg-green-100 border-green-200";
      case "payment":
        return "bg-green-100 border-green-200";
      case "inventory":
        return "bg-green-100 border-green-200";
      default:
        return "bg-green-100 border-green-200";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="flex-1 overflow-auto p-4 sm:p-6 pt-16 lg:pt-6">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Notifications
            </h2>
            <p className="text-xs sm:text-base text-gray-600">
              You have {notifications.filter((n) => !n.read).length} unread
              notifications
            </p>
          </div>

          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="bg-white rounded-lg p-8 sm:p-12 text-center">
                <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-sm sm:text-base text-gray-600">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`${getNotificationColor(
                    notification.type,
                  )} border rounded-lg p-4 flex items-start justify-between gap-4 hover:shadow-md transition-shadow`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.time}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="text-gray-400 hover:text-red-600 p-2 hover:bg-white rounded transition-colors flex-shrink-0"
                    aria-label="Delete notification"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
