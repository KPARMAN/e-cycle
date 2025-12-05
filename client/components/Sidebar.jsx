import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  ShoppingBag,
  User,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleMenuClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-green-600 text-white flex flex-col shadow-lg
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
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
                  onClick={() => handleMenuClick(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? "bg-green-700 text-white"
                      : "text-green-100 hover:bg-green-500"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
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
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
