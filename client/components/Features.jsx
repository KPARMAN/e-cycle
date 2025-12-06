import { Button } from "@/components/ui/button.jsx";

const features = [
  {
    icon: "",
    title: "Waste Category Insights",
    description:
      "Gain deep insights into your waste streams with detailed categorization and analytics powered by machine learning.",
  },
  {
    icon: "",
    title: "Easy inventory upload",
    description:
      "Upload and manage your e-waste inventory effortlessly with our intuitive interface and bulk import capabilities.",
  },
  {
    icon: "",
    title: "Discovery & Filtering",
    description:
      "Quickly find recycling partners and disposal solutions tailored to your specific waste management needs.",
  },
];

export default function Features() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-8 sm:mb-12 md:mb-16">
          {/* Image */}
          <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg order-2 lg:order-1">
            <img
              src="https://images.pexels.com/photos/3174348/pexels-photo-3174348.jpeg"
              alt="E-waste recycling: Aerial view of landfill with mixed garbage and electronic waste"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Key features of our E-Cycle platform
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Discover how our innovative features streamline your e-waste
              management and drive operational efficiency across your
              organization.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="text-4xl sm:text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            These powerful features work together to create a complete e-waste
            management ecosystem that transforms how your organization handles
            electronic waste.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button className="bg-primary text-white hover:bg-primary/90 text-base px-6 sm:px-8 py-3 sm:py-6 rounded-lg w-full sm:w-auto">
            Get started
          </Button>
        </div>
      </div>
    </section>
  );
}
