import { Button } from "@/components/ui/button.jsx";

export default function Streamline() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          Streamline your e-waste management
        </h2>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
          Our platform simplifies complex e-waste management processes, giving you complete visibility and control over your electronic waste lifecycle from collection to responsible recycling.
        </p>
        <Button variant="outline" className="text-base px-8 py-6 rounded-lg border-gray-300">
          Explore
        </Button>
      </div>
    </section>
  );
}
