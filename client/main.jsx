import "./global.css";

import { Toaster } from "@/components/ui/toaster.jsx";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner.jsx";
import { TooltipProvider } from "@/components/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import RoleSelection from "./pages/RoleSelection.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Notifications from "./pages/Notifications.jsx";
import AddListings from "./pages/AddListings.jsx";
import ManageListings from "./pages/ManageListings.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Messages from "./pages/Messages.jsx";
import ExploreListing from "./pages/ExploreListing.jsx";
import Inventory from "./pages/Inventory.jsx";
import Listings from "./pages/Listings.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/role-selection" element={<RoleSelection />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/add-listings" element={<AddListings />} />
          <Route path="/dashboard/manage-listings" element={<ManageListings />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/explore-listing" element={<ExploreListing />} />
          <Route path="/dashboard/inventory" element={<Inventory />} />
          <Route path="/dashboard/listings" element={<Listings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

let root;

function render() {
  if (!root) {
    root = createRoot(document.getElementById("root"));
  }
  root.render(<App />);
}

render();

if (import.meta.hot) {
  import.meta.hot.accept("./App.jsx", () => {
    render();
  });
}
