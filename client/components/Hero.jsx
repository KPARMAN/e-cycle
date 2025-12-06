import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 relative bg-cover bg-center bg-fixed bg-no-repeat pt-16 sm:pt-20"
      style={{
        backgroundImage: "url('/images/hero.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="flex flex-col justify-center items-center text-center lg:col-span-2 px-0 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Transform e-waste into <br className="hidden sm:inline" />
              sustainable solutions
            </h1>
            <p className="text-base sm:text-lg text-white mb-6 sm:mb-8 leading-relaxed max-w-2xl">
              Streamline e-waste management with our innovative platform.
              Technicians and admins can easily track, verify, and process waste
              for responsible recycling.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto">
              <Button
                onClick={() => navigate("/auth/login")}
                className="bg-primary px-6 sm:px-8 py-3 sm:py-6 rounded-lg text-black hover:bg-primary/90 text-sm w-full sm:w-auto"
              >
                Login...
              </Button>
              <Button
                onClick={() => navigate("/auth/role-selection")}
                className="bg-green-100 text-foreground hover:bg-green-200 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-6 rounded-lg border-transparent w-full sm:w-auto"
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
