import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      title: "E-Waste Collection",
      description: "We provide efficient and safe collection of electronic waste from your organization. Our team ensures proper handling and transportation of all e-waste materials.",
      icon: "📦",
    },
    {
      title: "Waste Assessment & Categorization",
      description: "Comprehensive analysis and categorization of your electronic waste streams. We identify valuable materials and create detailed reports for compliance tracking.",
      icon: "📊",
    },
    {
      title: "Recycling & Recovery",
      description: "Advanced recycling processes that recover valuable materials from e-waste. We maximize material recovery while ensuring environmental responsibility.",
      icon: "♻️",
    },
    {
      title: "Certification & Compliance",
      description: "Full compliance documentation and certification for all recycling activities. We ensure your organization meets all regulatory requirements.",
      icon: "✓",
    },
    {
      title: "Platform Management",
      description: "Our intuitive E-Cycle platform provides real-time tracking, inventory management, and analytics for your e-waste operations.",
      icon: "💻",
    },
    {
      title: "Consultation & Support",
      description: "Expert consultation to optimize your e-waste management strategy. Our team provides ongoing support to maximize efficiency and sustainability.",
      icon: "🤝",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Services Hero */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="max-w-4xl mx-auto text-center">
            <Button
              onClick={() => navigate("/")}
              className="mb-6 px-4 py-2 text-gray-700 hover:text-green-600 bg-transparent hover:bg-gray-100 rounded-lg font-medium transition-colors"
              aria-label="Go back to home page"
            >
              ← Back to Home
            </Button>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive e-waste management solutions designed to help your organization achieve sustainability goals while maximizing efficiency and compliance.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to optimize your e-waste management?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Contact our team to learn more about how we can support your organization.
            </p>
            <Button
              onClick={() => navigate("/contact")}
              className="bg-primary text-white hover:bg-primary/90 text-base px-8 py-3 rounded-lg font-semibold"
            >
              Get in Touch
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
