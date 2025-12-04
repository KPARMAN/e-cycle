import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  ShoppingBag,
  User,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: 2,
      label: "E-waste Inventory",
      icon: Package,
      path: "/dashboard/inventory",
    },
    {
      id: 3,
      label: "Messages",
      icon: MessageSquare,
      path: "/dashboard/messages",
    },
    {
      id: 4,
      label: "Listings",
      icon: ShoppingBag,
      path: "/dashboard/listings",
    },
    {
      id: 5,
      label: "Notifications",
      icon: Bell,
      path: "/dashboard/notifications",
    },
    {
      id: 6,
      label: "Profile",
      icon: User,
      path: "/dashboard/profile",
    },
    {
      id: 7,
      label: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    navigate("/auth/login");
  };

  return (
    <div className="w-64 bg-green-600 text-white flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-green-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-green-600 text-lg font-bold">E</span>
          </div>
          <div>
            <p className="font-bold text-lg">E-Cycle</p>
            <p className="text-xs text-green-100">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? "bg-green-700 text-white"
                    : "text-green-100 hover:bg-green-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-green-100 hover:bg-green-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
