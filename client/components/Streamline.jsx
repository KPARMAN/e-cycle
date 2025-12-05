import { Button } from "@/components/ui/button.jsx";

export default function Streamline() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/12491634/pexels-photo-12491634.jpeg"
              alt="Person collecting plastic waste outdoors in Cameroon for e-waste management"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Streamline your e-waste management
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Our platform simplifies complex e-waste management processes,
              giving you complete visibility and control over your electronic
              waste lifecycle from collection to responsible recycling.
            </p>
            <Button
              variant="outline"
              className="text-base px-8 py-6 rounded-lg border-gray-300"
            >
              Explore
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
