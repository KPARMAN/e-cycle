import { Button } from "@/components/ui/button.jsx";

export default function Revolutionize() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Revolutionize your <br /> e-waste management
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
             Transform complex waste into simple streamlined experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-primary text-white hover:bg-primary/90 text-base px-8 py-6 rounded-lg">
                Get started
              </Button>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="relative h-80 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-200 via-cyan-200 to-green-200 rounded-3xl opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-emerald-100 to-transparent rounded-3xl opacity-40"></div>
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4"></div>
                <p className="text-sm font-semibold text-gray-700">Sustainable Future</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
