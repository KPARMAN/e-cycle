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
      message: "Payment of $450 has been confirmed",
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
        return "bg-blue-50 border-blue-200";
      case "listing":
        return "bg-orange-50 border-orange-200";
      case "payment":
        return "bg-green-50 border-green-200";
      case "inventory":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
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

        <div className="flex-1 overflow-auto p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Notifications
            </h2>
            <p className="text-gray-600">
              You have {notifications.filter((n) => !n.read).length} unread
              notifications
            </p>
          </div>

          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`${getNotificationColor(
                    notification.type
                  )} border rounded-lg p-4 flex items-start justify-between hover:shadow-md transition-shadow`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.time}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="text-gray-400 hover:text-red-600 ml-4"
                  >
                    <Trash2 className="w-5 h-5" />
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
