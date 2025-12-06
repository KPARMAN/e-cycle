import { Button } from "@/components/ui/button.jsx";

export default function Revolutionize() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left side - Text */}
          <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Revolutionize your <br /> e-waste management
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Transform complex waste into simple streamlined experience
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full sm:w-auto">
              <Button className="bg-primary text-white hover:bg-primary/90 text-base px-6 sm:px-8 py-3 sm:py-6 rounded-lg w-full sm:w-auto">
                Get started
              </Button>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg order-1 lg:order-2">
            <img
              src="https://images.pexels.com/photos/11256545/pexels-photo-11256545.jpeg"
              alt="E-waste recycling: Pile of old air conditioners awaiting proper electronic waste processing"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
