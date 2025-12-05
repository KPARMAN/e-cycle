import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Menu, X } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "About us", path: "/about" },
    { label: "Contact us", path: "/contact" },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-transparent">
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          <span className="text-foreground hidden sm:inline">E-Cycle</span>
        </Link>

        {/* Desktop nav links */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-foreground hover:text-primary transition-colors text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Action buttons - Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            onClick={() => navigate("/auth/login")}
            variant="outline"
            className="text-sm bg-green-100 text-black hover:bg-green-200 border-transparent"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/auth/role-selection")}
            className="bg-primary text-black hover:bg-primary/90 text-sm"
          >
            Sign up
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
              <Button
                onClick={() => {
                  navigate("/auth/login");
                  setMobileMenuOpen(false);
                }}
                variant="outline"
                className="w-full text-sm bg-green-100 text-black hover:bg-green-200 border-transparent"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/auth/role-selection");
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-primary text-black hover:bg-primary/90 text-sm"
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
