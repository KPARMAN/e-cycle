import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-transparent">
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          <span className="text-foreground">E-Cycle</span>
        </Link>

        {/* nav links */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden sm:flex">
          <div className="flex items-center gap-6">
            <a href="#home" className="text-sm text-foreground hover:text-primary transition-colors text-black">
              Home
            </a>
            <a href="#services" className="text-sm text-foreground hover:text-primary transition-colors text-black">
              Services
            </a>
            <a href="#about" className="text-sm text-foreground hover:text-primary transition-colors text-black">
              About us
            </a>
            <a href="#contact" className="text-sm text-foreground hover:text-primary transition-colors text-black">
              Contact us
            </a>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
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
    </header>
  );
}
