import { Button } from "@/components/ui/button.jsx";

export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 relative bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: "url('/images/hero.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-center items-center text-center lg:col-span-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Transform e-waste into <br />
              sustainable solutions
            </h1>
            <p className="text-lg text-white mb-8 leading-relaxed">
              Streamline e-waste management with our innovative platform. Technicians and admins <br />
              can easily track, verify, and process waste for responsible recycling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-primary px-8 py-6 rounded-lg  text-black hover:bg-primary/90 text-sm">
                Login...
              </Button>
              <Button
                className="bg-green-100 text-foreground hover:bg-green-200 text-base px-8 py-6 rounded-lg border-transparent"
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
