import { Button } from "@/components/ui/button.jsx";

export default function CTA() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to transform your e-waste management?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join thousands of organizations already benefiting from our innovative e-waste management platform. Start your sustainability journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary text-white hover:bg-primary/90 text-base px-8 py-6 rounded-lg">
                Get started free
              </Button>
              <Button variant="outline" className="text-base px-8 py-6 rounded-lg border-gray-300">
                Schedule demo
              </Button>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/7598913/pexels-photo-7598913.jpeg"
              alt="Collection of broken electronic components and discarded computer technology stacked together"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
