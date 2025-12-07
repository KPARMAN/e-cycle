import { Button } from "@/components/ui/button.jsx";

export default function Benefits() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left side - Image */}
          <div className="order-2 lg:order-1 relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/2644597/pexels-photo-2644597.jpeg"
              alt="E-waste recycling: Broken hard drives showing data destruction and material recovery"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Benefits of our platform
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Reduce operational waste management costs by up to 40%, improve
              compliance tracking, minimize environmental impact, and enhance
              your brand reputation with our comprehensive e-waste management
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button className="bg-primary text-white hover:bg-primary/90 text-base px-6 sm:px-8 py-3 sm:py-6 rounded-lg w-full sm:w-auto">
                Explore benefits
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
