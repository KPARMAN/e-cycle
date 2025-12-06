import { Button } from "@/components/ui/button.jsx";

export default function Streamline() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg order-2 lg:order-1">
            <img
              src="https://images.pexels.com/photos/9953442/pexels-photo-9953442.jpeg"
              alt="E-waste recycling: Discarded electronics with exposed wires and components"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Text */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Streamline your e-waste management
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 md:mb-10 leading-relaxed">
              Our platform simplifies complex e-waste management processes,
              giving you complete visibility and control over your electronic
              waste lifecycle from collection to responsible recycling.
            </p>
            <Button
              variant="outline"
              className="text-base px-6 sm:px-8 py-3 sm:py-6 rounded-lg border-gray-300 w-full sm:w-auto"
            >
              Explore
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
