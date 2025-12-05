import Sidebar from "@/components/Sidebar.jsx";
import DashboardHeader from "@/components/DashboardHeader.jsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function Inventory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [inventory, setInventory] = useState([
    {
      id: 1,
      itemName: "Dell Latitude Laptop",
      sku: "DELL-001",
      category: "Electronics",
      quantity: 12,
      condition: "Good",
      value: "₦4,500",
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      itemName: "RAM DDR4 8GB Module",
      sku: "RAM-DDR4-001",
      category: "Computer Parts",
      quantity: 24,
      condition: "Excellent",
      value: "₦2,880",
      lastUpdated: "1 day ago",
    },
    {
      id: 3,
      itemName: "HP Printer LaserJet",
      sku: "HP-PRINTER-001",
      category: "Office Equipment",
      quantity: 5,
      condition: "Good",
      value: "₦2,250",
      lastUpdated: "3 days ago",
    },
    {
      id: 4,
      itemName: "Samsung Monitor 27 inch",
      sku: "SAMSUNG-MON-001",
      category: "Displays",
      quantity: 8,
      condition: "Like New",
      value: "₦1,600",
      lastUpdated: "5 days ago",
    },
    {
      id: 5,
      itemName: "Keyboard & Mouse Bundle",
      sku: "BUNDLE-KM-001",
      category: "Peripherals",
      quantity: 15,
      condition: "Good",
      value: "₦1,200",
      lastUpdated: "1 week ago",
    },
  ]);

  const handleDelete = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const filteredInventory = inventory.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalValue = inventory.reduce((acc, item) => {
    const value = parseInt(item.value.replace(/[₦,]/g, ""));
    return acc + value;
  }, 0);

  const totalItems = inventory.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="flex-1 overflow-auto p-4 sm:p-6 pt-16 lg:pt-6">
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                E-waste Inventory
              </h2>
              <p className="text-xs sm:text-base text-gray-600">
                Manage your e-waste items and stock levels
              </p>
            </div>
            <Button
              onClick={() => navigate("/dashboard/add-listings")}
              className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <p className="text-gray-600 text-xs sm:text-sm font-medium">Total Items</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                {totalItems}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <p className="text-gray-600 text-xs sm:text-sm font-medium">
                Inventory Items
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                {inventory.length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <p className="text-gray-600 text-xs sm:text-sm font-medium">Total Value</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2 truncate">
                ₦
                {(totalValue / 100).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {/* Inventory Table - Desktop */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-green-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Item Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    SKU
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Condition
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Value
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Last Updated
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInventory.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {item.itemName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.sku}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        {item.condition}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                      {item.value}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.lastUpdated}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors" aria-label="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredInventory.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No inventory items found</p>
              </div>
            )}
          </div>

          {/* Inventory Cards - Mobile */}
          <div className="md:hidden space-y-4">
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                >
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 truncate">
                    {item.itemName}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">SKU: {item.sku}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs">Category</p>
                      <p className="text-gray-900 font-semibold text-xs">
                        {item.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Quantity</p>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold inline-block">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Condition</p>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold inline-block">
                        {item.condition}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Value</p>
                      <p className="text-gray-900 font-semibold text-xs">
                        {item.value}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-3">
                    Updated: {item.lastUpdated}
                  </p>

                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors text-sm">
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600 text-sm">No inventory items found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
