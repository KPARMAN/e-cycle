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

          {/* Right side - Image */}
          <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/34406295/pexels-photo-34406295.jpeg"
              alt="Workers handling waste disposal in an urban environment on a sunny day"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
