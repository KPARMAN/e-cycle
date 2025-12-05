import Sidebar from "@/components/Sidebar.jsx";
import DashboardHeader from "@/components/DashboardHeader.jsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, MapPin } from "lucide-react";

export default function ExploreListing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  const listings = [
    {
      id: 1,
      title: "Dell Laptop Computer",
      price: "$450",
      category: "Electronics",
      seller: "Sarah Johnson",
      location: "San Francisco, CA",
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
      rating: 4.8,
      condition: "Like New",
    },
    {
      id: 2,
      title: "Computer RAM Modules",
      price: "$120",
      category: "Computers",
      seller: "Alex Chen",
      location: "New York, NY",
      image:
        "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg",
      rating: 4.5,
      condition: "Good",
    },
    {
      id: 3,
      title: "Used Mobile Phones",
      price: "$200",
      category: "Mobile Devices",
      seller: "Maria Garcia",
      location: "Los Angeles, CA",
      image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
      rating: 4.9,
      condition: "Fair",
    },
    {
      id: 4,
      title: "Computer Monitor 24 inch",
      price: "$150",
      category: "Electronics",
      seller: "John Smith",
      location: "Chicago, IL",
      image:
        "https://images.pexels.com/photos/16217559/pexels-photo-16217559.jpeg",
      rating: 4.6,
      condition: "Good",
    },
    {
      id: 5,
      title: "Keyboard and Mouse Set",
      price: "$80",
      category: "Electronics",
      seller: "Emily Brown",
      location: "Boston, MA",
      image:
        "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
      rating: 4.7,
      condition: "Like New",
    },
    {
      id: 6,
      title: "Graphics Card GTX 1060",
      price: "$280",
      category: "Computers",
      seller: "David Lee",
      location: "Seattle, WA",
      image:
        "https://images.pexels.com/photos/8348756/pexels-photo-8348756.jpeg",
      rating: 4.8,
      condition: "Excellent",
    },
  ];

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
                Explore Listings
              </h2>
              <p className="text-gray-600">
                Discover e-waste items from sellers near you
              </p>
            </div>
            <Button
              onClick={() => navigate("/dashboard/add-listings")}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Create Listings
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Category
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Computers</option>
                <option>Mobile Devices</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Condition
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>All Conditions</option>
                <option>Excellent</option>
                <option>Like New</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Price Range
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Any Price</option>
                <option>$0 - $100</option>
                <option>$100 - $500</option>
                <option>$500+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Location
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>All Locations</option>
                <option>Near Me</option>
                <option>Within 10 miles</option>
                <option>Within 50 miles</option>
              </select>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(listing.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                      favorites.includes(listing.id)
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={
                        favorites.includes(listing.id) ? "currentColor" : "none"
                      }
                    />
                  </button>
                  <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {listing.condition}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 truncate">
                    {listing.title}
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {listing.rating}
                    </span>
                    <span className="text-sm text-gray-600">
                      by {listing.seller}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>

                  <p className="text-2xl font-bold text-green-600 mb-3">
                    {listing.price}
                  </p>

                  <div className="space-y-2">
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No listings found</p>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
