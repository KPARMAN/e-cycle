import Sidebar from "@/components/Sidebar.jsx";
import DashboardHeader from "@/components/DashboardHeader.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Eye, Edit2, Trash2, Plus } from "lucide-react";

export default function Listings() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Used Laptop Computer",
      category: "Electronics",
      price: "$450",
      quantity: 2,
      status: "Active",
      views: 234,
      posted: "3 days ago",
    },
    {
      id: 2,
      title: "Desktop PC Parts",
      category: "Computers",
      price: "$320",
      quantity: 5,
      status: "Active",
      views: 156,
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "Old Mobile Phones",
      category: "Mobile Devices",
      price: "$50",
      quantity: 10,
      status: "Expired",
      views: 89,
      posted: "2 weeks ago",
    },
    {
      id: 4,
      title: "Computer Monitors",
      category: "Electronics",
      price: "$150",
      quantity: 3,
      status: "Active",
      views: 412,
      posted: "5 days ago",
    },
    {
      id: 5,
      title: "Keyboard & Mouse Set",
      category: "Peripherals",
      price: "$80",
      quantity: 7,
      status: "Active",
      views: 187,
      posted: "1 week ago",
    },
  ]);

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const handleDelete = (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const activeListings = listings.filter((l) => l.status === "Active").length;
  const expiredListings = listings.filter((l) => l.status === "Expired").length;
  const totalViews = listings.reduce((acc, l) => acc + l.views, 0);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="flex-1 overflow-auto p-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                My Listings
              </h2>
              <p className="text-gray-600">
                View and manage all your marketplace listings
              </p>
            </div>
            <Button
              onClick={() => navigate("/dashboard/add-listings")}
              className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Listing
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-gray-600 text-sm font-medium">
                Total Listings
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {listings.length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-gray-600 text-sm font-medium">Active</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {activeListings}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-gray-600 text-sm font-medium">Expired</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {expiredListings}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-gray-600 text-sm font-medium">Total Views</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {totalViews}
              </p>
            </div>
          </div>

          {/* Listings Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-green-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Listing Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Views
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Posted
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredListings.map((listing) => (
                  <tr
                    key={listing.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {listing.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {listing.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                      {listing.price}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          listing.status,
                        )}`}
                      >
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {listing.views} views
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {listing.posted}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(listing.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No listings found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
