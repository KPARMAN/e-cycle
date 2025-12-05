import Sidebar from "@/components/Sidebar.jsx";
import DashboardHeader from "@/components/DashboardHeader.jsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Edit2, Trash2 } from "lucide-react";

export default function AddListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    location: "",
    images: [],
  });
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      category: "Hard Drives",
      quantity: 16,
      unit: "kg",
    },
    {
      id: 2,
      category: "Motherboard",
      quantity: 20,
      unit: "kg",
    },
    {
      id: 3,
      category: "RAM",
      quantity: 50,
      unit: "pieces",
    },
    {
      id: 4,
      category: "Laptop",
      quantity: 50,
      unit: "pieces",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Listing submitted:", formData);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Add new listings
            </h2>
          </div>

          <div className="bg-green-50 rounded-lg p-8 shadow-sm mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 transition-colors cursor-pointer bg-white">
                    <p className="text-gray-500">Upload photos</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Add description
                  </label>
                  <button
                    type="button"
                    className="text-green-600 hover:text-green-700 mb-4"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11 19a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L11 10.586 9.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Current Inventory List */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Current Inventory List
            </h3>
            <p className="text-gray-600 text-sm mb-4">3 Items added</p>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Unit
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {inventoryItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.unit}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-gray-600 hover:text-red-600 transition-colors">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Enter category</option>
              </select>
              <input
                type="number"
                placeholder="Enter quantity e.g 10"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Kilogram (kg)</option>
              </select>
              <Button className="bg-green-600 text-white hover:bg-green-700 rounded-full w-10 h-10 p-0 flex items-center justify-center">
                +
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              variant="outline"
              className="bg-white text-gray-700 border-gray-300"
            >
              Save for Later
            </Button>
            <Button className="bg-green-600 text-white hover:bg-green-700 ml-auto">
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
